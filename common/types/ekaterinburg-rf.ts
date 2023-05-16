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

export interface ServerStop {
    st_id: string;
    st_title: string;
    st_title_en: string;
    st_lat: string;
    st_long: string;
}

export interface ServerPark {
    pk_id: string;
    pk_title: string;
    pk_title_en: string;
}

export interface RaceListCoords {
    rd_lat: string;
    rd_long: string;
}

export interface ServerRaceList {
    mr_id: string;
    rl_firststation: string;
    rl_firststation_en: string;
    rl_firststation_id: string;
    rl_id: string;
    rl_laststation: string;
    rl_laststation_en: string;
    rl_laststation_id: string;
    rl_racetype: string;
    stopList: ServerStop[];
    coordList: RaceListCoords[];
}

export interface ServerRoute extends RoutesTree {
    parks: ServerPark[];
    races: ServerRaceList[];
}

export interface ServerStopArriveUnit
    extends Pick<RoutesTree, 'mr_id' | 'mr_num'>,
        Pick<ServerRaceList, 'rl_racetype'>,
        Pick<TransTypeTree, 'tt_id'>,
        Pick<ServerUnit, 'u_inv'> {
    firststation_title: string;
    firststation_title_en: string;
    laststation_title: string;
    laststation_title_en: string;
    tc_arrivetime: string;
    tc_systime: string;
}

export interface TransTypeTree<RoutesType = RoutesTree[]> {
    routes: RoutesType;
    tt_id: string;
    tt_title: TransportRu;
    tt_title_en: TransportEn;
}

export interface RoutesTree {
    mr_id: string;
    mr_num: string;
    mr_title: string;
    mr_title_en: string;
}

export interface ServerUnit
    extends Pick<RoutesTree, 'mr_id' | 'mr_num'>,
        Pick<ServerRaceList, 'rl_racetype'>,
        ServerPark,
        Omit<TransTypeTree, 'routes'> {
    u_id: string;
    u_statenum: string;
    u_garagnum: string;
    u_model: string;
    u_timenav: string;
    u_lat: string;
    u_long: string;
    u_speed: string;
    u_course: string;
    u_inv: string;
    rl_firststation_title: string;
    rl_firststation_title_en: string;
    rl_laststation_title: string;
    rl_laststation_title_en: string;
}

export interface ServerUnitArrive
    extends Pick<ServerUnit, 'mr_id' | 'u_id' | 'rl_racetype'>,
        Pick<ServerStop, 'st_id' | 'st_title' | 'st_title_en'> {
    ta_systime: string;
    ta_arrivetime: string;
}
