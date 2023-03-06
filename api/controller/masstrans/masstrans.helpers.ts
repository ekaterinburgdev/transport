import { Unit } from '../../model/ekaterinburg-rf/ekaterinburg-rf.types.js';

export function processUnitData(units: Unit[]) {
    return units.map((unit) => ({
        id: Number(unit.mr_id),
        num: unit.mr_num,
        depoTitle: unit.pk_title,
        firstStation: unit.rl_firststation_title,
        lastStation: unit.rl_laststation_title,
        routeDirection: unit.rl_racetype,
        type: unit.tt_title_en.toLowerCase().slice(0, 5),
        course: Number(unit.u_course),
        disabled: Number(unit.u_inv),
        coords: [Number(unit.u_lat), Number(unit.u_long)],
        model: unit.u_model,
        speed: Number(unit.u_speed),
        stateNumber: unit.u_statenum,
    }));
}
