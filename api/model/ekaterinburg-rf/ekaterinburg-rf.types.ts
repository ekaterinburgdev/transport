import { TransportEn, jsonrpc, TransportRu } from './ekaterinburg-rf.constants.js';

export type JsonRpcResponse<T> = {
    jsonrpc: typeof jsonrpc;
    id: string;
    result: T;
};

export type InitSessionResponse = {
    sid: string;
};

export type GetTransTypeTreeResponse = TransTypeTree[];

export type TransTypeTree<RoutesType = RoutesTree[]> = {
    routes: RoutesType;
    tt_id: string;
    tt_title: TransportRu;
    tt_title_en: TransportEn;
};

export type TransportRoutesTree = {
    [routeNum: string]: RoutesTree;
};

export type RoutesTree = {
    mr_id: string;
    mr_num: string;
    mr_title: string;
    mr_title_en: string;
};

export type GetUnitsResponse = Unit[];

export type Unit = {
    u_id: string;
    tt_id: string;
    tt_title: TransportRu;
    tt_title_en: TransportEn;
    pk_id: string;
    u_statenum: string;
    u_garagnum: string;
    u_model: string;
    u_timenav: string;
    u_lat: string;
    u_long: string;
    u_speed: string;
    u_course: string;
    u_inv: string;
    mr_id: string;
    mr_num: string;
    rl_racetype: string;
    pk_title: string;
    pk_title_en: string;
    rl_firststation_title: string;
    rl_firststation_title_en: string;
    rl_laststation_title: string;
    rl_laststation_title_en: string;
};

export type JsonRpcErrorResponse = Omit<JsonRpcResponse<object>, 'result'> & {
    error: {
        code: number;
        message: string;
        message_en: string;
    };
};

export type TransportTree = {
    [TransportEn.Bus]: TransTypeTree<TransportRoutesTree>;
    [TransportEn.Tram]: TransTypeTree<TransportRoutesTree>;
    [TransportEn.Troll]: TransTypeTree<TransportRoutesTree>;
};
