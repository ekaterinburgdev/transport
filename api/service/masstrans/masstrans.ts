import {
    ServerStopArriveUnit,
    ServerPark,
    ServerRoute,
    ServerStop,
    ServerUnit,
    ServerUnitArrive,
} from 'transport-common/types/ekaterinburg-rf';

import {
    ClientUnit,
    StopInfoItem,
    Depo,
    Route,
    Stop,
    Unit,
    UnitArriveInfo,
    UnitArriveStop,
} from 'transport-common/types/masstrans';

export class MasstransService {
    processUnitData(units: ServerUnit[]): Unit[] {
        return units.map((unit) => ({
            id: unit.u_id,
            routeId: parseInt(unit.mr_id, 10),
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

    processPark(park: ServerPark): Depo {
        return {
            id: parseInt(park.pk_id, 10),
            title: park.pk_title,
        };
    }

    processStop(stop: ServerStop): Omit<Stop, 'type'> {
        return {
            stopId: stop.st_id,
            coords: [parseFloat(stop.st_lat), parseFloat(stop.st_long)],
            title: stop.st_title,
        };
    }

    processRouteData(route: ServerRoute): Route {
        return {
            id: parseInt(route.mr_id, 10),
            num: route.mr_num,
            title: route.mr_title,
            depos: route.parks.map(this.processPark),
            races: route.races.map((race) => ({
                coordsList: race.coordList.map((coords) => [
                    parseFloat(coords.rd_lat),
                    parseFloat(coords.rd_long),
                ]),
                id: race.rl_id,
                firstStation: race.rl_firststation,
                lastStation: race.rl_laststation,
                raceType: race.rl_racetype,
                stops: race.stopList.map(this.processStop),
            })),
        };
    }

    processUnitArrive(arriveInfos: ServerUnitArrive[]): UnitArriveInfo[] {
        return arriveInfos.map((item) => ({
            stopId: item.st_id,
            title: item.st_title,
            arriveTime: item.ta_arrivetime,
            routeId: item.mr_id,
            routeDirection: item.rl_racetype,
        }));
    }

    processStopInfoData(stopInfo: (ServerStopArriveUnit & { type: ClientUnit })[]): StopInfoItem[] {
        return stopInfo.map((item) => ({
            arriveTime: item.tc_arrivetime,
            route: item.mr_num,
            routeDirection: item.rl_racetype,
            type: item.type,
            to: item.laststation_title,
            // TODO: get through stations from GetRoute
            through: [],
        }));
    }

    processUnitInfo(route: Route, unitArriveInfo: UnitArriveInfo[]) {
        const currentRace = route.races.find(
            (race) => race.raceType === unitArriveInfo[0].routeDirection,
        );

        if (!currentRace) {
            throw new Error('No race of current route direction');
        }

        const { stops } = currentRace;

        const result: UnitArriveStop[] = [...stops];
        const nextStopIndex = result.findIndex((stop) => stop.stopId === unitArriveInfo[0].stopId);

        const arriveInfoWithCoords = unitArriveInfo.slice(0, result.length).map((info, idx) => ({
            ...info,
            coords: result[nextStopIndex + idx]?.coords,
        }));

        result.splice(nextStopIndex, arriveInfoWithCoords.length, ...arriveInfoWithCoords);

        return result;
    }
}
