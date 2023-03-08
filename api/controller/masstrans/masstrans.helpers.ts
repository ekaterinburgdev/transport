import { Unit } from '../../model/ekaterinburg-rf/ekaterinburg-rf.types.js';

export function processUnitData(units: Unit[]) {
    return units.map((unit) => ({
        id: parseInt(unit.mr_id, 10),
        num: unit.mr_num,
        depoTitle: unit.pk_title,
        firstStation: unit.rl_firststation_title,
        lastStation: unit.rl_laststation_title,
        routeDirection: unit.rl_racetype,
        type: unit.tt_title_en.toLowerCase().slice(0, 5),
        course: parseInt(unit.u_course, 10),
        accessibility: parseInt(unit.u_inv, 10),
        coords: [parseInt(unit.u_lat, 10), parseInt(unit.u_long, 10)],
        model: unit.u_model,
        speed: parseInt(unit.u_speed, 10),
        stateNumber: unit.u_statenum,
    }));
}
