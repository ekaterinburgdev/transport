import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { uniqBy } from 'lodash';

import { ClientUnit, Unit } from 'transport-common/types/masstrans';
import { StrapiStop } from 'transport-common/types/strapi';

import { useDisablePropagation } from 'hooks/useDisablePropagation';
import { State } from 'common/types/state';

import { MapSearchBarUnitResult } from './UnitResult/UnitResult';
import { MapSearchBarStopResult } from './StopsResult/StopResult';

import styles from './SearchBar.module.css';

const cn = classNames.bind(styles);

const INPUT_PLACEHOLDER = 'Поиск';
const uniqUnitsIteratee = (unit: Unit) => `${unit.num}${unit.routeDirection}`;

export function MapSearchBar() {
    const searchBarRef = useRef<HTMLDivElement>(null);
    const [placeholder, setPlaceholder] = useState<string>(INPUT_PLACEHOLDER);
    const [searchResult, setSearchResult] = useState<{ stops: StrapiStop[]; units: Unit[] }>({
        stops: [],
        units: [],
    });

    const stops = useSelector((state: State) => state.publicTransport.stops);
    const units = useSelector((state: State) => state.publicTransport.units);

    useDisablePropagation(searchBarRef);

    const onFocus = useCallback(() => {
        setPlaceholder('');
    }, [setPlaceholder]);

    const onBlur = useCallback(() => {
        setPlaceholder(INPUT_PLACEHOLDER);
    }, [setPlaceholder]);

    const onSearch = useCallback(
        (event) => {
            const searchText = (event.target as HTMLInputElement).value.toLowerCase();

            if (!searchText) {
                setSearchResult({ stops: [], units: [] });

                return;
            }

            const stopsSearch = stops.filter((stop) =>
                stop.attributes.title.toLowerCase().includes(searchText),
            );
            const trollsSearch = uniqBy(
                units[ClientUnit.Troll].filter(
                    (troll) =>
                        troll.lastStation.toLowerCase().includes(searchText) ||
                        troll.firstStation.toLowerCase().includes(searchText) ||
                        troll.num.toLowerCase().includes(searchText),
                ),
                uniqUnitsIteratee,
            );
            const tramsSearch = uniqBy(
                units[ClientUnit.Tram].filter(
                    (tram) =>
                        tram.lastStation.toLowerCase().includes(searchText) ||
                        tram.firstStation.toLowerCase().includes(searchText) ||
                        tram.num.toLowerCase().includes(searchText),
                ),
                uniqUnitsIteratee,
            );
            const busesSearch = uniqBy(
                units[ClientUnit.Bus].filter(
                    (bus) =>
                        bus.lastStation.toLowerCase().includes(searchText) ||
                        bus.firstStation.toLowerCase().includes(searchText) ||
                        bus.num.toLowerCase().includes(searchText),
                ),
                uniqUnitsIteratee,
            );

            setSearchResult({
                stops: stopsSearch,
                units: [...trollsSearch, ...tramsSearch, ...busesSearch],
            });
        },
        [stops, units],
    ) as React.FormEventHandler;

    const hasResults = useMemo(
        () => Boolean(searchResult.stops.length || searchResult.units.length),
        [searchResult],
    );

    const onSubmit = useCallback((event) => {
        event.preventDefault();
    }, []) as React.FormEventHandler;

    return (
        <div className={cn(styles.MapSearchBar)} ref={searchBarRef}>
            <form
                className={cn(styles.MapSearchBar__form, {
                    [styles.MapSearchBar__form_withResult]: hasResults,
                })}
                onSubmit={onSubmit}
            >
                <img src="/icons/search.svg" alt="Иконка лупы" />
                <input
                    type="search"
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onInput={onSearch}
                    className={cn(styles.MapSearchBar__input)}
                />
            </form>
            {hasResults && (
                <div className={cn(styles.MapSearchBar__results)}>
                    {searchResult.units.map((unit) => (
                        <MapSearchBarUnitResult {...unit} />
                    ))}
                    {searchResult.stops.map(({ attributes: stop }) => (
                        <MapSearchBarStopResult {...stop} />
                    ))}
                </div>
            )}
        </div>
    );
}
