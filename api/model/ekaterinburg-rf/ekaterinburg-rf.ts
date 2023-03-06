import got, { OptionsOfJSONResponseBody } from 'got';
import _ from 'lodash';

import {
    TransportEn,
    jsonrpc,
    JsonRpcMethods,
    responseType,
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

    private getUnits(type: TransportEn): Promise<GetUnitsResponse | null> {
        if (!this.transportTree) {
            return Promise.resolve(null);
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

        const { body } = await got.post<JsonRpcResponse<InitSessionResponse>>(
            marhsrutEkaterinburgRfJsonRpcLink,
            {
                json: {
                    id: this.requestId,
                    jsonrpc,
                    method: JsonRpcMethods.StartSession,
                    params: {},
                },
                responseType,
            },
        );

        this.sid = body.result.sid;
    }

    private async sendRequest<R>(method: JsonRpcMethods, params: object) {
        if (!this.sid) {
            await this.initSession();
        }

        this.incrementRequestId();

        const gotOptions = {
            json: {
                id: this.requestId,
                jsonrpc,
                method,
                params: {
                    ...params,
                    sid: this.sid,
                },
            },
            responseType,
        };

        let { body } = await got.post<JsonRpcResponse<R>>(
            marhsrutEkaterinburgRfJsonRpcLink,
            gotOptions as OptionsOfJSONResponseBody,
        );

        const isSessionError = await this.processSessionError(body);

        if (isSessionError) {
            this.incrementRequestId();

            gotOptions.json.params.sid = this.sid;
            gotOptions.json.id = this.requestId;

            ({ body } = await got.post<JsonRpcResponse<R>>(
                marhsrutEkaterinburgRfJsonRpcLink,
                gotOptions as OptionsOfJSONResponseBody,
            ));
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
