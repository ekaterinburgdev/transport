import {
    ServerPark,
    ServerRoute,
    ServerStop,
    ServerUnit,
} from 'transport-common/types/ekaterinburg-rf';
import { ClientUnit, Depo, Route, Stop, Unit } from 'transport-common/types/masstrans';

export function processUnitData(units: ServerUnit[]): Unit[] {
    return units.map((unit) => ({
        id: parseInt(unit.mr_id, 10),
        num: unit.mr_num,
        depoTitle: unit.pk_title,
        firstStation: unit.rl_firststation_title,
        lastStation: unit.rl_laststation_title,
        routeDirection: unit.rl_racetype,
        type: unit.tt_title_en.toLowerCase().slice(0, 5) as ClientUnit,
        course: parseInt(unit.u_course, 10),
        accessibility: Boolean(parseInt(unit.u_inv, 10)),
        coords: [parseFloat(unit.u_lat), parseFloat(unit.u_long)],
        model: unit.u_model,
        speed: parseInt(unit.u_speed, 10),
        stateNumber: unit.u_statenum,
        boardId: parseInt(unit.u_garagnum, 10),
    }));
}

function processPark(park: ServerPark): Depo {
    return {
        id: parseInt(park.pk_id, 10),
        title: park.pk_title,
    };
}

function processStop(stop: ServerStop): Omit<Stop, 'type'> {
    return {
        stopId: stop.st_id,
        coords: [parseFloat(stop.st_lat), parseFloat(stop.st_long)],
        title: stop.st_title,
    };
}

export function processRouteData(route: ServerRoute): Route {
    return {
        id: parseInt(route.mr_id, 10),
        num: route.mr_num,
        title: route.mr_title,
        depos: route.parks.map(processPark),
        races: route.races.map((race) => ({
            coordsList: race.coordList.map((coords) => [
                parseFloat(coords.rd_lat),
                parseFloat(coords.rd_long),
            ]),
            id: race.rl_id,
            firstStation: race.rl_firststation,
            lastStation: race.rl_laststation,
            raceType: race.rl_racetype,
            stops: race.stopList.map(processStop),
        })),
    };
}
