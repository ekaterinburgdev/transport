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

export interface TransportTreeOfType {
    type: ClientUnit;
    numbers: string[];
    ids: string[];
    numberToId: {
        [number: string]: {
            number: string;
            id: string;
        };
    };
}

export interface TransportTree {
    [ClientUnit.Bus]: TransportTreeOfType;
    [ClientUnit.Tram]: TransportTreeOfType;
    [ClientUnit.Troll]: TransportTreeOfType;
}

export interface Stop {
    title: string;
    stopId: string;
    coords: [number, number];
    type: StopType;
}

export interface StopInfoItem {
    arriveTime: string;
    route: string;
    type: ClientUnit;
    to: string;
    through: string[];
}

export interface Unit {
    id: string;
    routeId: number;
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
}

export interface Depo {
    id: number;
    title: string;
}

export interface Race {
    coordsList: [number, number][];
    id: string;
    firstStation: string;
    lastStation: string;
    raceType: string;
    stops: Omit<Stop, 'type'>[];
}

export interface Route {
    id: number;
    num: string;
    title: string;
    depos: Depo[];
    races: Race[];
}

interface UnitArriveInfoOwnFields {
    arriveTime: string;
    routeId: string;
    routeDirection: string;
}

export interface UnitArriveInfo extends Omit<Stop, 'type' | 'coords'>, UnitArriveInfoOwnFields {}

export interface UnitArriveStop extends Omit<Stop, 'type'>, Partial<UnitArriveInfoOwnFields> {}

export interface ImageFormat {
    url: string;
    width: number;
    height: number;
}

export enum ImageSizes {
    Thumbnail = 'thumbnail',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export interface UnitInfo {
    image?: {
        data: {
            id: number;
            attributes: {
                formats: Record<ImageSizes, ImageFormat>;
            };
        };
    };
    imageUrl?: string;
    boardNumber: string;
    model: string;
    factoryNumber: string;
    year: string;
    type?: ClientUnit;
    factory?: string;
}
