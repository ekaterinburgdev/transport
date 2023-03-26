export enum ClientUnit {
    Bus = 'bus',
    Tram = 'tram',
    Troll = 'troll',
}

export enum StopType {
    Bus = 'bus',
    Tram = 'tram',
    Troll = 'troll',
    TrollBus = 'troll-bus',
}

export type TransportTreeOfType = {
    type: ClientUnit;
    numbers: string[];
    ids: string[];
    numberToId: {
        [number: string]: {
            number: string;
            id: string;
        };
    };
};

export type TransportTree = {
    [ClientUnit.Bus]: TransportTreeOfType;
    [ClientUnit.Tram]: TransportTreeOfType;
    [ClientUnit.Troll]: TransportTreeOfType;
};

export type Stop = {
    title: string;
    stopId: string;
    coords: [number, number];
    type: StopType;
};
