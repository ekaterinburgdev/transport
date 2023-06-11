// FIXME: cure divatosis
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import classNames from 'classnames/bind';

import {
    ClientUnit,
    ImageSizes,
    StopType,
    UnitArriveStop,
    UnitInfo,
} from 'transport-common/types/masstrans';
import { STRAPI_URL } from 'transport-common/strapi/constants';

import { massTransApi } from 'api/masstrans/masstrans';
import { VEHICLE_TYPE_COLORS, VEHICLE_TYPE_TRANSLUCENT_COLORS } from 'common/constants/colors';

import { Divider } from 'components/UI/Divider/Divider';

import Arrow from 'public/icons/arrow.svg';

import { getNoun } from 'utils/plural';

import { PageText } from 'components/UI/Typography/PageText/PageText';
import { Typography } from 'components/UI/Typography/Typography';

import { MapVehiclesItemProps } from '../Item/MapVehiclesItem.types';
import { MapVehicleMarker } from '../Marker/MapVehicleMarker';

import Velocity from './Velocity/velocity.svg';
import VelocityColor from './Velocity/velocity-color.svg';

import {
    additionalHeader,
    vehiclesName,
    SVERDLOVSK_REGION,
    featuresTitle,
} from './MapVehiclesSidebar.constants';
import { getPointsRow } from './MapVehiclesSidebar.utils';

import styles from './MapVehiclesSidebar.module.css';

export type MapVehiclesSidebarProps = {
    type: StopType;
    name: string;
};

const cn = classNames.bind(styles);

// function IconComponent({ feature, className }: { feature: string; className: string }) {
//     const NeedIcon = dynamic<any>(() => import(`public/icons/${feature}.svg`), {
//         loading: () => null,
//         ssr: false,
//     });
//     console.log(NeedIcon);
//     return <NeedIcon className={className} />;
// }

export function MapVehiclesSidebar({
    id,
    boardId,
    speed,
    num,
    type,
    stateNumber,
    warning,
    accessibility,
    firstStation,
    lastStation,
    depoTitle,
    coords,
}: MapVehiclesItemProps) {
    const [from, to] = [firstStation, lastStation];
    const [stops, setStops] = useState<UnitArriveStop[]>([]);
    const [unitInfo, setUnitInfo] = useState<UnitInfo>(null);
    const latLngCoords = useMemo(() => new L.LatLng(...coords), [coords]);

    useEffect(() => {
        massTransApi.getVehicleInfo(id).then((stopsRes) => {
            setStops(stopsRes || []);
        });
    }, [id]);

    useEffect(() => {
        massTransApi
            .getUnitInfo({
                type,
                boardId,
                stateNumber,
                num,
            })
            .then((unitInfoRes) => {
                const unitInfoItem = unitInfoRes[0];

                setUnitInfo(unitInfoItem?.attributes);
            });
    }, [type, boardId, stateNumber, num]);

    const stateNumberObject = useMemo(() => {
        const splittedStateNum = stateNumber.toLocaleLowerCase().split(' ');
        if (splittedStateNum.length === 1) {
            return null;
        }

        const roadNumber = splittedStateNum.slice(0, -1);
        let region = splittedStateNum.at(-1);

        if (!parseInt(region, 10)) {
            roadNumber.push(region);
            region = SVERDLOVSK_REGION;
        }

        return {
            number: roadNumber,
            region: region,
        };
    }, [stateNumber]);

    const vehicleOperator = useMemo(() => {
        if (type !== ClientUnit.Bus) {
            return {
                title: 'Гортранс',
                subTitle: depoTitle,
            };
        }

        const depoTitleMatch = depoTitle.match(/(.+)\s+\((.+)\)/);

        return {
            title: depoTitleMatch ? depoTitleMatch?.[1] : depoTitle,
            subTitle: depoTitleMatch?.[2] ? `Филиал ${depoTitleMatch?.[2]}` : undefined,
        };
    }, [depoTitle]);

    const manufactureYearDiff = useMemo(() => {
        if (!unitInfo?.year) {
            return 0;
        }

        const numberYear = parseInt(unitInfo.year.match(/((\d+)\.)?(\d{4})/)[3], 10);

        return new Date().getFullYear() - numberYear;
    }, [unitInfo?.year]);

    const [afterOpened, setAfterOpened] = useState(false);
    const [beforeOpened, setBeforeOpened] = useState(false);

    const nearestStopIndex = useMemo(
        () =>
            Math.max(
                stops.reduce(
                    (acc, stop, idx) => {
                        if (!stop.coords || !latLngCoords) {
                            return acc;
                        }

                        const distance = latLngCoords.distanceTo(stop.coords);

                        if (distance < acc.distance) {
                            acc.idx = idx;
                            acc.distance = distance;
                        }

                        return acc;
                    },
                    { idx: 0, distance: Infinity },
                ).idx,
                0,
            ),
        [stops],
    );
    const afterStart = useMemo(() => stops.slice(1, nearestStopIndex), [stops, nearestStopIndex]);
    const lastNearestIndex = useMemo(
        () => Math.min(nearestStopIndex + 4, stops.length - 1),
        [stops, nearestStopIndex],
    );
    const afterNearest = useMemo(
        () => stops.slice(nearestStopIndex + 1, lastNearestIndex),
        [stops, nearestStopIndex, lastNearestIndex],
    );
    const beforeEnd = useMemo(
        () => stops.slice(lastNearestIndex, stops.length - 1),
        [stops, lastNearestIndex],
    );
    const endStop = useMemo(() => stops[stops.length - 1], [stops]);

    return (
        <div className={cn(styles.MapVehiclesSidebar)}>
            <div className={cn(styles.MapVehiclesSidebarWrapper)}>
                {unitInfo?.image.data && (
                    <div className={cn(styles.MapVehiclesSidebarVehicleImageWrapper)}>
                        <img
                            src={`${STRAPI_URL}${
                                unitInfo?.image.data.attributes.formats[ImageSizes.Small].url
                            }`}
                            className={cn(styles.MapVehiclesSidebarVehicleImage)}
                            width={448}
                            height={250}
                            alt={`Маршрут №${num}`}
                        />
                    </div>
                )}
                <div className={cn(styles.MapVehiclesSidebarVehicleInfoWrapper)}>
                    <div className={cn(styles.MapVehiclesSidebarVehicleInfo)}>
                        <div
                            className={cn(styles.MapVehiclesSidebarRoute)}
                            style={{
                                backgroundColor: VEHICLE_TYPE_COLORS[type],
                            }}
                        >
                            {num}
                        </div>
                        <div className={cn(styles.MapVehiclesSidebarVehicleFeatures)}>
                            {warning && (
                                <abbr title={featuresTitle.warning} style={{ fontSize: 0 }}>
                                    <img
                                        src="/icons/warning.svg"
                                        width="26"
                                        height="24"
                                        alt="warning"
                                    />
                                </abbr>
                            )}
                            {accessibility && (
                                <abbr title={featuresTitle.accessibility} style={{ fontSize: 0 }}>
                                    <img
                                        src={`/icons/${type}-accessibility.svg`}
                                        width={32}
                                        height={32}
                                        alt={featuresTitle.accessibility}
                                    />
                                </abbr>
                            )}
                        </div>
                    </div>
                    <div className={cn(styles.MapVehiclesSidebarVelocity)}>
                        <Velocity className={cn(styles.MapVehiclesSidebarVelocityIcon)} />
                        <VelocityColor
                            className={cn(
                                styles.MapVehiclesSidebarVelocityColorIcon,
                                styles[`MapVehiclesSidebarVelocityColorIcon_${type}`],
                            )}
                        />
                        <span
                            className={cn(styles.MapVehiclesSidebarVelocityValue)}
                            style={{ color: VEHICLE_TYPE_COLORS[type] }}
                        >
                            {speed}
                        </span>
                        <span className={cn(styles.MapVehiclesSidebarVelocityMeasure)}>км/ч</span>
                    </div>
                </div>
                <div className={cn(styles.MapVehiclesSidebarDirectionInfo)}>
                    <ul className={cn(styles.MapVehiclesSidebarDirection)}>
                        <li className={cn(styles.MapVehiclesSidebarHeaderStation)}>
                            <div className={cn(styles.MapVehiclesSidebarHeaderBullet)} />
                            <Typography variant="h3">{from}</Typography>
                        </li>
                        <li className={cn(styles.MapVehiclesSidebarHeaderStation)}>
                            <div
                                className={cn(
                                    styles.MapVehiclesSidebarHeaderBullet,
                                    styles.MapVehiclesSidebarHeaderBullet_fill,
                                    {
                                        [styles.MapVehiclesSidebarHeaderBullet_warning]: warning,
                                    },
                                )}
                            />
                            <Typography
                                variant="h3"
                                className={cn({ [styles.MapVehiclesSidebarTo_warning]: warning })}
                            >
                                {to}
                            </Typography>
                        </li>
                    </ul>
                    {warning && (
                        <span className={cn(styles.MapVehiclesSidebarWarningInfo)}>
                            {`${vehiclesName[type]} едет по измененному маршруту`}
                        </span>
                    )}
                </div>
                {stops.length > 0 && (
                    <div className={cn(styles.MapVehiclesSidebarStopsWrapper)}>
                        <Divider />
                        <ul
                            className={cn(
                                styles.MapVehiclesSidebarStops,
                                styles[`MapVehiclesSidebarStops_${type}`],
                            )}
                        >
                            {/* TODO: вытащить li в компонент */}
                            {nearestStopIndex !== 0 && (
                                <li className={cn(styles.MapVehiclesSidebarStation)}>
                                    <div
                                        className={cn(
                                            styles.MapVehiclesSidebarBullet,
                                            styles.MapVehiclesSidebarBullet_big,
                                        )}
                                        style={{
                                            borderColor: VEHICLE_TYPE_TRANSLUCENT_COLORS[type],
                                        }}
                                    />
                                    <PageText
                                        className={cn(
                                            styles.MapVehiclesSidebarStationName,
                                            styles.MapVehiclesSidebarStartStation,
                                        )}
                                    >
                                        {stops[0].title}
                                    </PageText>
                                </li>
                            )}
                            {afterStart.length > 0 && (
                                <div
                                    className={cn(styles.MapVehiclesSidebarHiddenStationWrapper)}
                                    onClick={() => {
                                        setAfterOpened(!afterOpened);
                                    }}
                                >
                                    {!afterOpened && (
                                        <div className={cn(styles.MapVehiclesSidebarHiddenCount)}>
                                            {getPointsRow(afterStart.length)}
                                        </div>
                                    )}
                                    <div
                                        className={cn(
                                            styles.MapVehiclesSidebarHiddenCountTextWrapper,
                                        )}
                                    >
                                        <PageText>
                                            {`${afterStart.length} ${getNoun(
                                                afterStart.length,
                                                'остановка',
                                                'остановки',
                                                'остановок',
                                            )}`}
                                        </PageText>
                                        <Arrow
                                            className={cn(styles.MapVehiclesSidebarHiddenArrow, {
                                                [styles.MapVehiclesSidebarHiddenArrow_opened]:
                                                    afterOpened,
                                            })}
                                        />
                                    </div>
                                    {afterOpened &&
                                        afterStart.map((stop) => (
                                            <li className={cn(styles.MapVehiclesSidebarStation)}>
                                                <div
                                                    className={cn(styles.MapVehiclesSidebarBullet)}
                                                    style={{
                                                        borderColor:
                                                            VEHICLE_TYPE_TRANSLUCENT_COLORS[type],
                                                    }}
                                                />
                                                <PageText
                                                    className={cn(
                                                        styles.MapVehiclesSidebarStationName,
                                                    )}
                                                >
                                                    {stop.title}
                                                </PageText>
                                            </li>
                                        ))}
                                </div>
                            )}
                            <div className={cn(styles.MapVehiclesSidebarActiveStops)}>
                                <div
                                    className={cn(styles.MapVehiclesSidebarActiveBorder)}
                                    style={{ backgroundColor: VEHICLE_TYPE_COLORS[type] }}
                                />
                                <li className={cn(styles.MapVehiclesSidebarStation)}>
                                    <div className={cn(styles.MapVehiclesSidebarVehicleMarker)}>
                                        <MapVehicleMarker
                                            id="sidebar"
                                            routeNumber={num}
                                            type={type}
                                            isCourseEast={false}
                                            additionalInfo={false}
                                            course={180}
                                        />
                                    </div>
                                    <PageText className={cn(styles.MapVehiclesSidebarStationName)}>
                                        {stops[nearestStopIndex]?.title}
                                    </PageText>
                                </li>
                                {afterNearest.map((stop) => (
                                    <li className={cn(styles.MapVehiclesSidebarStation)}>
                                        <div
                                            className={cn(styles.MapVehiclesSidebarBullet)}
                                            style={{ borderColor: VEHICLE_TYPE_COLORS[type] }}
                                        />
                                        <PageText
                                            className={cn(styles.MapVehiclesSidebarStationName)}
                                        >
                                            {stop.title}
                                        </PageText>
                                        {'arriveTime' in stop && (
                                            <PageText>{stop.arriveTime}</PageText>
                                        )}
                                    </li>
                                ))}
                                {beforeEnd.length > 0 && (
                                    <div
                                        className={cn(
                                            styles.MapVehiclesSidebarHiddenStationWrapper,
                                        )}
                                        onClick={() => {
                                            setBeforeOpened(!beforeOpened);
                                        }}
                                    >
                                        {!beforeOpened && (
                                            <div
                                                className={cn(styles.MapVehiclesSidebarHiddenCount)}
                                            >
                                                {getPointsRow(beforeEnd.length)}
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                styles.MapVehiclesSidebarHiddenCountTextWrapper,
                                            )}
                                        >
                                            <PageText>
                                                {`${beforeEnd.length} ${getNoun(
                                                    beforeEnd.length,
                                                    'остановка',
                                                    'остановки',
                                                    'остановок',
                                                )}`}
                                            </PageText>
                                            <Arrow
                                                className={cn(
                                                    styles.MapVehiclesSidebarHiddenArrow,
                                                    {
                                                        [styles.MapVehiclesSidebarHiddenArrow_opened]:
                                                            beforeOpened,
                                                    },
                                                )}
                                            />
                                        </div>
                                        {beforeOpened &&
                                            beforeEnd.map((stop) => (
                                                <li
                                                    className={cn(styles.MapVehiclesSidebarStation)}
                                                >
                                                    <div
                                                        className={cn(
                                                            styles.MapVehiclesSidebarBullet,
                                                        )}
                                                        style={{
                                                            borderColor: VEHICLE_TYPE_COLORS[type],
                                                        }}
                                                    />
                                                    <PageText
                                                        className={cn(
                                                            styles.MapVehiclesSidebarStationName,
                                                        )}
                                                    >
                                                        {stop.title}
                                                    </PageText>
                                                    {'arriveTime' in stop && (
                                                        <PageText>{stop.arriveTime}</PageText>
                                                    )}
                                                </li>
                                            ))}
                                    </div>
                                )}
                                {stops.length > 0 && nearestStopIndex !== stops.length - 1 && (
                                    <li className={cn(styles.MapVehiclesSidebarStation)}>
                                        <div
                                            className={cn(
                                                styles.MapVehiclesSidebarBullet,
                                                styles.MapVehiclesSidebarBullet_big,
                                            )}
                                            style={{ borderColor: VEHICLE_TYPE_COLORS[type] }}
                                        />
                                        <PageText
                                            className={cn(styles.MapVehiclesSidebarStationName)}
                                        >
                                            {endStop.title}
                                        </PageText>

                                        {'arriveTime' in endStop && (
                                            <PageText>{endStop.arriveTime}</PageText>
                                        )}
                                    </li>
                                )}
                            </div>
                        </ul>
                    </div>
                )}
                <Divider />
                <div className={cn(styles.MapVehiclesSidebarAdditionalWrapper)}>
                    <Typography
                        className={cn(styles.MapVehiclesSidebarAdditionalTitle)}
                        variant="h3"
                    >
                        {`Подробнее ${additionalHeader[type]}`}
                    </Typography>
                    <div className={cn(styles.MapVehiclesSidebarAdditional)}>
                        <div className={cn(styles.MapVehiclesSidebarOperatorWrapper)}>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Перевозчик
                            </span>
                            {/* // TODO: add operators' pics */}
                            {/* {vehicleOperator.title === 'Гортранс' && (
                                <Image src={operatorPic} layout="intrinsic" alt="Перевозчик" />
                            )} */}
                            <div>
                                <span className={cn(styles.MapVehiclesSidebarAdditionalTitle)}>
                                    {vehicleOperator.title}
                                </span>
                                {vehicleOperator.subTitle && (
                                    <>
                                        <br />
                                        <span
                                            className={cn(
                                                styles.MapVehiclesSidebarAdditionalSubitle,
                                            )}
                                        >
                                            {vehicleOperator.subTitle}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Бортномер
                            </span>
                            <br />
                            <span className={cn(styles.MapVehiclesSidebarBoardId)}>{boardId}</span>
                        </div>
                        {stateNumberObject && (
                            <div className={cn(styles.MapVehiclesSidebarLabelWrapper)}>
                                <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                    Госномер
                                </span>
                                <div className={cn(styles.MapVehiclesSidebarRoadNumberWrapper)}>
                                    <div
                                        className={cn(styles.MapVehiclesSidebarRoadNumber, {
                                            [styles.MapVehiclesSidebarRoadNumberPassenger]:
                                                stateNumberObject.number.length === 2,
                                        })}
                                    >
                                        {stateNumberObject.number.map((part) => (
                                            <span key={part}>{part}</span>
                                        ))}
                                    </div>
                                    <div
                                        className={cn(styles.MapVehiclesSidebarRegionWrapper, {
                                            [styles.MapVehiclesSidebarRoadNumberPassenger]:
                                                stateNumberObject.number.length === 2,
                                        })}
                                    >
                                        <span className={cn(styles.MapVehiclesSidebarRegionNumber)}>
                                            {stateNumberObject.region}
                                        </span>
                                        <span className={cn(styles.MapVehiclesSidebarRegion)}>
                                            RUS
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {unitInfo && (
                        <>
                            <Divider />
                            <div className={cn(styles.MapVehiclesSidebarAdditional)}>
                                {Boolean(unitInfo?.model || unitInfo?.factory) && (
                                    <div className={cn(styles.MapVehiclesSidebarModelWrapper)}>
                                        <span
                                            className={cn(styles.MapVehiclesSidebarAdditionalLabel)}
                                        >
                                            Модель машины
                                        </span>
                                        {/* TODO: add models' pics */}
                                        {/* <Image src={modelPic} layout="intrinsic" alt="Модель" /> */}
                                        <div>
                                            {unitInfo.model && (
                                                <span
                                                    className={cn(
                                                        styles.MapVehiclesSidebarAdditionalTitle,
                                                    )}
                                                >
                                                    {unitInfo.model}
                                                </span>
                                            )}
                                            {Boolean(unitInfo.model && unitInfo.factory) && <br />}
                                            {unitInfo.factory && (
                                                <span
                                                    className={cn(
                                                        styles.MapVehiclesSidebarAdditionalSubitle,
                                                    )}
                                                >
                                                    {unitInfo.factory}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {unitInfo?.factoryNumber && (
                                    <div className={cn(styles.MapVehiclesSidebarLabelWrapper)}>
                                        <span
                                            className={cn(styles.MapVehiclesSidebarAdditionalLabel)}
                                        >
                                            Заводской номер
                                        </span>
                                        <span
                                            className={cn(styles.MapVehiclesSidebarFactoryNumber)}
                                        >
                                            {unitInfo.factoryNumber}
                                        </span>
                                    </div>
                                )}
                                {unitInfo?.year && (
                                    <div className={cn(styles.MapVehiclesSidebarLabelWrapper)}>
                                        <span
                                            className={cn(styles.MapVehiclesSidebarAdditionalLabel)}
                                        >
                                            Год выпуска
                                        </span>
                                        <span
                                            className={cn(styles.MapVehiclesSidebarManufactureYear)}
                                        >
                                            {unitInfo.year}
                                        </span>
                                        <span
                                            className={cn(
                                                styles.MapVehiclesSidebarManufactureYearDiff,
                                            )}
                                        >
                                            {`${manufactureYearDiff} ${getNoun(
                                                manufactureYearDiff,
                                                'год',
                                                'года',
                                                'лет',
                                            )} назад`}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
