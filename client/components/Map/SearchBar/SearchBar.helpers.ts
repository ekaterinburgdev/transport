import { uniqBy } from 'lodash';
import { Unit } from 'transport-common/types/masstrans';

const uniqUnitsIteratee = (unit: Unit) => `${unit.num}${unit.routeDirection}`;

export function searchThroughUnits(units: Unit[], searchText: string) {
    return uniqBy(
        units
            .filter(
                (troll) =>
                    troll.lastStation.toLowerCase().includes(searchText) ||
                    troll.firstStation.toLowerCase().includes(searchText) ||
                    troll.num.toLowerCase().includes(searchText),
            )
            .sort((a, b) => a.firstStation.localeCompare(b.firstStation, 'ru', { numeric: true })),
        uniqUnitsIteratee,
    );
}
