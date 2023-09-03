import { Stop, TransportTreeOfType, UnitInfo } from './masstrans';

export enum StrapiContentTypes {
    Stop = 'stop',
    TransportTree = 'transport-tree',
    UnitInfo = 'unit-info',
}

export interface StrapiBase<AttributesType> {
    id: number;
    attributes: AttributesType;
}

export type StrapiStop = StrapiBase<Stop>;

export type StrapiUnitInfo = StrapiBase<UnitInfo>;

export type StrapiTree = StrapiBase<TransportTreeOfType>;

export interface StrapiLoginResponse {
    user: string;
    jwt: string;
}
