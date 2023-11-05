import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { ClientUnit, Unit } from 'transport-common/types/masstrans';
import { StrapiStop } from 'transport-common/types/strapi';

import { useDisablePropagation } from 'hooks/useDisablePropagation';
import { State } from 'common/types/state';

import { MapSearchBarUnitResult } from './UnitResult/UnitResult';
import { MapSearchBarStopResult } from './StopsResult/StopResult';

import styles from './SearchBar.module.css';
import { searchThroughUnits } from './SearchBar.helpers';

const cn = classNames.bind(styles);

const INPUT_PLACEHOLDER = 'Поиск';

export function MapSearchBar() {
    const searchBarRef = useRef<HTMLDivElement>(null);
    const [searchResult, setSearchResult] = useState<{ stops: StrapiStop[]; units: Unit[] }>({
        stops: [],
        units: [],
    });

    const stops = useSelector((state: State) => state.publicTransport.stops);
    const units = useSelector((state: State) => state.publicTransport.units);

    useDisablePropagation(searchBarRef);

    const onSearch = useCallback(
        (event) => {
            const searchText = (event.target as HTMLInputElement).value.toLowerCase();

            if (!searchText) {
                setSearchResult({ stops: [], units: [] });

                return;
            }

            const stopsSearch = stops
                .filter((stop) => stop.attributes.title.toLowerCase().includes(searchText))
                .sort((a, b) =>
                    a.attributes.title.localeCompare(b.attributes.title, 'ru', { numeric: true }),
                );

            const trollsSearch = searchThroughUnits(units[ClientUnit.Troll], searchText);
            const tramsSearch = searchThroughUnits(units[ClientUnit.Tram], searchText);
            const busesSearch = searchThroughUnits(units[ClientUnit.Bus], searchText);

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
                <img src="/icons/search.svg" alt="" />
                <input
                    type="search"
                    placeholder={INPUT_PLACEHOLDER}
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
