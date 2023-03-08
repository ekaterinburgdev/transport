import fetch from 'node-fetch';
import HttpsProxyAgent from 'https-proxy-agent';
import _ from 'lodash';

import {
    TransportEn,
    jsonrpc,
    JsonRpcMethods,
    marhsrutEkaterinburgRfJsonRpcLink,
} from './ekaterinburg-rf.constants.js';
import {
    TransportTree,
    JsonRpcResponse,
    GetUnitsResponse,
    JsonRpcErrorResponse,
    InitSessionResponse,
    GetTransTypeTreeResponse,
} from './ekaterinburg-rf.types.js';

// @ts-ignore
const proxyAgent = new HttpsProxyAgent('http://95.56.254.139:3128');
const fetchCommonOptions = {
    agent: proxyAgent,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

export class EkaterinburgRfModel {
    private requestId = 1;
    private sid = '';
    private transportTree: TransportTree | undefined = undefined;

    constructor() {
        this.getTransTypeTree().then((tree) => {
            const treeWithRoutesGroupedByNumber = tree.map((transportTypeTree) => ({
                ...transportTypeTree,
                routes: _.keyBy(transportTypeTree.routes, 'mr_num'),
            }));

            this.transportTree = _.keyBy(
                treeWithRoutesGroupedByNumber,
                'tt_title_en',
            ) as unknown as TransportTree;
        });
    }

    getBuses() {
        return this.getUnits(TransportEn.Bus);
    }

    getTrolls() {
        return this.getUnits(TransportEn.Troll);
    }

    getTrams() {
        return this.getUnits(TransportEn.Tram);
    }

    async getAllUnits() {
        const buses = (await this.getBuses()) || [];
        const trolls = (await this.getTrolls()) || [];
        const trams = (await this.getTrams()) || [];

        return [...buses, ...trolls, ...trams];
    }

    private async getUnits(type: TransportEn): Promise<GetUnitsResponse | null> {
        if (!this.transportTree) {
            const tree = await this.getTransTypeTree();

            const treeWithRoutesGroupedByNumber = tree.map((transportTypeTree) => ({
                ...transportTypeTree,
                routes: _.keyBy(transportTypeTree.routes, 'mr_num'),
            }));

            this.transportTree = _.keyBy(
                treeWithRoutesGroupedByNumber,
                'tt_title_en',
            ) as unknown as TransportTree;
        }

        const marshList = Object.values(this.transportTree[type].routes).map(
            (route) => route.mr_id,
        );

        return this.sendRequest<GetUnitsResponse>(JsonRpcMethods.GetUnits, {
            marshList,
        });
    }

    private getTransTypeTree(): Promise<GetTransTypeTreeResponse> {
        return this.sendRequest<GetTransTypeTreeResponse>(JsonRpcMethods.GetTransTypeTree, {
            ok_id: '',
        });
    }

    private async initSession() {
        this.requestId = 1;

        const response = await fetch(marhsrutEkaterinburgRfJsonRpcLink, {
            ...fetchCommonOptions,
            body: JSON.stringify({
                id: this.requestId,
                jsonrpc,
                method: JsonRpcMethods.StartSession,
                params: {},
            }),
        });

        const body = (await response.json()) as JsonRpcResponse<InitSessionResponse>;

        this.sid = body.result.sid;
    }

    private async sendRequest<R>(method: JsonRpcMethods, params: object) {
        if (!this.sid) {
            await this.initSession();
        }

        this.incrementRequestId();

        const requestBody = {
            id: this.requestId,
            jsonrpc,
            method,
            params: {
                ...params,
                sid: this.sid,
            },
        };

        const fetchOptions = {
            ...fetchCommonOptions,
            body: JSON.stringify(requestBody),
        };

        let response = await fetch(marhsrutEkaterinburgRfJsonRpcLink, fetchOptions);
        let body = (await response.json()) as JsonRpcResponse<R>;

        const isSessionError = await this.processSessionError(body);

        if (isSessionError) {
            this.incrementRequestId();

            requestBody.params.sid = this.sid;
            requestBody.id = this.requestId;

            fetchOptions.body = JSON.stringify(requestBody);

            response = await fetch(marhsrutEkaterinburgRfJsonRpcLink, fetchOptions);
            body = (await response.json()) as JsonRpcResponse<R>;
        }

        if ((body as unknown as JsonRpcErrorResponse).error) {
            throw new Error((body as unknown as JsonRpcErrorResponse).error.message_en);
        }

        return body.result;
    }

    private async processSessionError(body: JsonRpcErrorResponse | JsonRpcResponse<any>) {
        const { error } = body as JsonRpcErrorResponse;

        if (!error) {
            return false;
        }

        if (error.message_en !== 'Session error') {
            throw new Error(error.message_en);
        }

        await this.initSession();

        return true;
    }

    private incrementRequestId() {
        this.requestId++;
    }
}
