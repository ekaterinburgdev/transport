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

export type StopInfoItem = {
    arriveTime: string;
    route: string;
    type: ClientUnit;
    to: string;
    through: string[];
};

export type Unit = {
    id: number;
    num: string;
    depoTitle: string;
    firstStation: string;
    lastStation: string;
    routeDirection: string;
    type: ClientUnit;
    course: number;
    accessibility: boolean;
    coords: [number, number];
    model: string;
    speed: number;
    stateNumber: string;
    boardId: number;
};

export type Depo = {
    id: number;
    title: string;
};

export type Race = {
    coordsList: [number, number][];
    id: string;
    firstStation: string;
    lastStation: string;
    raceType: string;
    stops: Omit<Stop, 'type'>[];
};

export type Route = {
    id: number;
    num: string;
    title: string;
    depos: Depo[];
    races: Race[];
};
