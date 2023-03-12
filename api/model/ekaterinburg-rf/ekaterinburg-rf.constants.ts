export const marhsrutEkaterinburgRfJsonRpcLink =
    'http://xn--80axnakf7a.xn--80acgfbsl1azdqr.xn--p1ai/api/rpc.php';
export const jsonrpc = '2.0';
export const responseType = 'json';

export enum JsonRpcMethods {
    StartSession = 'startSession',
    GetTransTypeTree = 'getTransTypeTree',
    GetUnits = 'getUnits',
}

export enum TransportRu {
    Bus = 'Автобус',
    Tram = 'Трамвай',
    Troll = 'Троллейбус',
}

export enum TransportEn {
    Bus = 'Bus',
    Tram = 'Tram',
    Troll = 'Trolley',
}
