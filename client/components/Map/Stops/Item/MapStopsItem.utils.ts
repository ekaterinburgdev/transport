import { ClientUnit, StopType } from 'transport-common/types/masstrans';

import { STOP_ICON_BY_TYPE, TROLL_BUS_ICON_BY_TYPE } from './MapStopsItem.constants';

export function getIconObjectByTypes(stopType: StopType, vehicleType?: ClientUnit) {
    if (!vehicleType) {
        if (stopType !== StopType.TrollBus) {
            return STOP_ICON_BY_TYPE[stopType];
        }

        return TROLL_BUS_ICON_BY_TYPE[ClientUnit.Bus];
    }

    if (stopType !== StopType.TrollBus) {
        return STOP_ICON_BY_TYPE[vehicleType];
    }

    return TROLL_BUS_ICON_BY_TYPE[vehicleType];
}
