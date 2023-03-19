import { ServerUnit, TransTypeTree } from 'transport-common/types/ekaterinburg-rf.js';

import { jsonrpc } from './ekaterinburg-rf.constants.js';

export type JsonRpcResponse<T> = {
    jsonrpc: typeof jsonrpc;
    id: string;
    result: T;
};

export type InitSessionResponse = {
    sid: string;
};

export type GetTransTypeTreeResponse = TransTypeTree[];

export type GetUnitsResponse = ServerUnit[];

export type JsonRpcErrorResponse = Omit<JsonRpcResponse<object>, 'result'> & {
    error: {
        code: number;
        message: string;
        message_en: string;
    };
};
