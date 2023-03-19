import { Stop, TransportTreeOfType } from './masstrans';

export enum StrapiContentTypes {
    Stop = 'stop',
    TransportTree = 'transport-tree',
}

export type StrapiStop = {
    id: number;
    attributes: Stop;
};

export type StrapiTree = {
    id: number;
    attributes: TransportTreeOfType;
};

export type StrapiLoginResponse = {
    user: string;
    jwt: string;
};
