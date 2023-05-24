import { Stop, TransportTreeOfType, UnitInfo } from './masstrans';

export enum StrapiContentTypes {
    Stop = 'stop',
    TransportTree = 'transport-tree',
    UnitInfo = 'unit-info',
}

export interface StrapiStop {
    id: number;
    attributes: Stop;
}

export interface StrapiUnitInfo {
    id: number;
    attributes: UnitInfo;
}

export interface StrapiTree {
    id: number;
    attributes: TransportTreeOfType;
}

export interface StrapiLoginResponse {
    user: string;
    jwt: string;
}
