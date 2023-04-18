import fetch from 'node-fetch';
import _ from 'lodash';

import { ServerRoute, ServerStopArriveUnit } from 'transport-common/types/ekaterinburg-rf';
import { ClientUnit, TransportTree } from 'transport-common/types/masstrans';
import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { StrapiContentTypes, StrapiTree } from 'transport-common/types/strapi';

import {
    jsonrpc,
    JsonRpcMethods,
    marhsrutEkaterinburgRfJsonRpcLink,
} from './ekaterinburg-rf.constants';
import {
    JsonRpcResponse,
    GetUnitsResponse,
    JsonRpcErrorResponse,
    InitSessionResponse,
    GetTransTypeTreeResponse,
    GetStopArriveResponse,
} from './ekaterinburg-rf.types';

const fetchCommonOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

export class EkaterinburgRfModel {
    private requestId = 1;
    private sid = '';
    private transportTree: null | TransportTree = null;

    constructor() {
        this.updateTransportTree();
    }

    getRoute(routeId: string): Promise<ServerRoute> {
        return this.sendRequest(JsonRpcMethods.GetRoute, {
            mr_id: routeId,
        });
    }

    async getStopInfo(stopId: string): Promise<(ServerStopArriveUnit & { type: ClientUnit })[]> {
        if (!this.transportTree) {
            await this.updateTransportTree();
        }

        const stopArrives = await this.sendRequest<GetStopArriveResponse>(
            JsonRpcMethods.GetStopArrive,
            {
                st_id: stopId,
            },
        );

        return stopArrives.map((stopArrive) => {
            let type = ClientUnit.Bus;

            if (this.transportTree!.tram.ids.includes(stopArrive.mr_id)) {
                type = ClientUnit.Tram;
            }

            if (this.transportTree!.troll.ids.includes(stopArrive.mr_id)) {
                type = ClientUnit.Troll;
            }

            return {
                ...stopArrive,
                type,
            };
        });
    }

    async getAllUnits(): Promise<GetUnitsResponse> {
        if (!this.transportTree) {
            await this.updateTransportTree();
        }

        if (!this.transportTree) {
            return [];
        }

        const marshList: string[] = [
            ...this.transportTree!.bus.ids,
            ...this.transportTree!.tram.ids,
            ...this.transportTree!.troll.ids,
        ];

        return this.sendRequest<GetUnitsResponse>(JsonRpcMethods.GetUnits, {
            marshList,
        });
    }

    async getUnitByType(clientUnit: ClientUnit): Promise<GetUnitsResponse> {
        if (!this.transportTree) {
            await this.updateTransportTree();
        }

        if (!this.transportTree) {
            return [];
        }

        const marshList = this.transportTree![clientUnit].ids;

        return this.sendRequest<GetUnitsResponse>(JsonRpcMethods.GetUnits, {
            marshList,
        });
    }

    private async updateTransportTree() {
        const tree = await this.getTransportTreeFromStrapi();

        if (!tree) {
            return;
        }

        const flatTree = tree.map((treeOfType) => treeOfType.attributes);
        const groupedTree = _.keyBy(flatTree, 'type') as TransportTree;

        this.transportTree = groupedTree;
    }

    private getTransportTreeFromStrapi(): Promise<StrapiTree[]> {
        const strapiTree = createStrapiMethods(StrapiContentTypes.TransportTree);

        return strapiTree.getAll();
    }

    getTransTypeTree(): Promise<GetTransTypeTreeResponse> {
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
