export enum VehicleType {
    Tram = 'tram',
    Troll = 'troll',
    Bus = 'bus',
}

export enum UnionVehicleType {
    TrollBus = 'troll-bus',
}

export type TStationType = VehicleType | UnionVehicleType;

export const StationType = { ...VehicleType, ...UnionVehicleType };
