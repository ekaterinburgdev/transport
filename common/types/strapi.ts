import { Stop, TransportTreeOfType, UnitInfo } from './masstrans';

export enum StrapiContentTypes {
    Stop = 'stop',
    TransportTree = 'transport-tree',
    UnitInfo = 'unit-info',
}

export interface StrapiBase<A> {
    id: number;
    attributes: A;
}

export type StrapiStop = StrapiBase<Stop>;

export type StrapiUnitInfo = StrapiBase<UnitInfo>;

export type StrapiTree = StrapiBase<TransportTreeOfType>;

export interface StrapiLoginResponse {
    user: string;
    jwt: string;
}
