// FIXME: cure divatosis
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
// import dynamic from 'next/dynamic';

import sidebarStyles from 'styles/leaflet-sidebar.module.css';

import { POSITION_CLASSES } from 'common/constants/positions';
import { TStationType } from 'common/types/masstrans';
import { VEHICLE_TYPE_COLORS, VEHICLE_TYPE_TRANSLUCENT_COLORS } from 'common/constants/colors';

import { Divider } from 'components/UI/Divider/Divider';
import { sidebarService } from 'services/sidebar/sidebar';

import Close from 'public/icons/close.svg';
import Arrow from 'public/icons/arrow.svg';

import { getNoun } from 'utils/plural';

import { useDisablePropagation } from 'hooks/useDisablePropagation';

import { PageText } from 'components/UI/Typography/PageText/PageText';
import { Typography } from 'components/UI/Typography/Typography';

import { MapVehiclesItemProps } from '../Item/MapVehiclesItem.types';
import { MapVehicleMarker } from '../Marker/MapVehicleMarker';

import modelPic from './mocks/model.png';
import operatorPic from './mocks/operator.png';
import { stations } from './mocks/stations';
import { featuresTitle, fixture } from './mocks/main';

import Velocity from './Velocity/velocity.svg';
import VelocityColor from './Velocity/velocity-color.svg';

import { additionalHeader, vehiclesName } from './MapVehiclesSidebar.consts';
import { isNowLessArrival, getPointsRow } from './MapVehiclesSidebar.utils';

import styles from './MapVehiclesSidebar.module.css';

export type MapVehiclesSidebarProps = {
    type: TStationType;
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
    boardId,
    velocity,
    routeNumber,
    type,
    warning,
    map,
}: MapVehiclesItemProps) {
    // TODO: from и to будут лежать в пропсах MapVehicles, закинуть их
    const [from, to] = ['п. Мичуринский', 'Восточная'];

    const {
        // imageUrl,
        features,
        additionalInfo: {
            vehicleModel,
            vehicleOperator,
            stateNumber,
            factoryNumber,
            manufactureYear,
        },
    } = fixture;

    const manufactureYearDiff = new Date().getFullYear() - manufactureYear;

    const ref = useRef<HTMLDivElement>(null);
    const [afterOpened, setAfterOpened] = useState(false);
    const [beforeOpened, setBeforeOpened] = useState(false);

    useDisablePropagation(ref);

    // FIXME: findIndex return -1
    const nearestStationIndex = Math.max(
        stations.findIndex((station) => isNowLessArrival(station)) - 1,
        0,
    );
    const afterStart = stations.slice(1, nearestStationIndex);
    const lastNearestIndex = Math.min(nearestStationIndex + 4, stations.length - 1);
    const afterNearest = stations.slice(nearestStationIndex + 1, lastNearestIndex);
    const beforeEnd = stations.slice(lastNearestIndex, stations.length - 1);

    return (
        <div
            ref={ref}
            className={cn(
                POSITION_CLASSES.topleft,
                styles.MapVehiclesSidebar,
                sidebarStyles.leafletSidebar,
            )}
        >
            <div className={cn(styles.MapVehiclesSidebarWrapper)}>
                <button
                    type="button"
                    onClick={() => {
                        map?.fireEvent?.('click');
                        sidebarService.close();
                    }}
                    className={cn(styles.MapVehiclesSidebarCloseButton)}
                >
                    <Close className={cn(styles.MapVehiclesSidebarCloseIcon)} />
                </button>
                <div className={cn(styles.MapVehiclesSidebarVehicleImage)}>
                    <Image src={`/${type}.png`} width="448" height="225" alt={type} />
                </div>
                <div className={cn(styles.MapVehiclesSidebarVehicleInfoWrapper)}>
                    <div className={cn(styles.MapVehiclesSidebarVehicleInfo)}>
                        <div
                            className={cn(styles.MapVehiclesSidebarRoute)}
                            style={{
                                backgroundColor: VEHICLE_TYPE_COLORS[type],
                            }}
                        >
                            {routeNumber}
                        </div>
                        <div className={cn(styles.MapVehiclesSidebarVehicleFeatures)}>
                            {warning && (
                                <abbr title={featuresTitle.warning} style={{ fontSize: 0 }}>
                                    <Image
                                        src="/icons/warning.svg"
                                        width="26"
                                        height="24"
                                        alt="warning"
                                    />
                                </abbr>
                            )}
                            {features.map((feature) => (
                                <abbr
                                    key={feature}
                                    title={featuresTitle[feature]}
                                    style={{ fontSize: 0 }}
                                >
                                    {/* TODO: temp solve instead of dinamic import */}
                                    <Image
                                        src={`/icons/${feature}-${type}.svg`}
                                        width={32}
                                        height={32}
                                        alt={`${feature}-${type}`}
                                    />
                                    {/* <IconComponent
                                    feature={feature}
                                    className={cn(
                                        styles[`MapVehiclesSidebarVehicleFeatureIcon_${type}`],
                                    )}
                                /> */}
                                </abbr>
                            ))}
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
                            {velocity}
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
                <div className={cn(styles.MapVehiclesSidebarStationsWrapper)}>
                    <Divider />
                    <ul
                        className={cn(
                            styles.MapVehiclesSidebarStations,
                            styles[`MapVehiclesSidebarStations_${type}`],
                        )}
                    >
                        {/* TODO: вытащить li в компонент */}
                        {nearestStationIndex !== 0 && (
                            <li className={cn(styles.MapVehiclesSidebarStation)}>
                                <div
                                    className={cn(
                                        styles.MapVehiclesSidebarBullet,
                                        styles.MapVehiclesSidebarBullet_big,
                                    )}
                                    style={{ borderColor: VEHICLE_TYPE_TRANSLUCENT_COLORS[type] }}
                                />
                                <PageText
                                    className={cn(
                                        styles.MapVehiclesSidebarStationName,
                                        styles.MapVehiclesSidebarStartStation,
                                    )}
                                >
                                    {stations[0].name}
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
                                    className={cn(styles.MapVehiclesSidebarHiddenCountTextWrapper)}
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
                                    afterStart.map((station) => (
                                        <li className={cn(styles.MapVehiclesSidebarStation)}>
                                            <div
                                                className={cn(styles.MapVehiclesSidebarBullet)}
                                                style={{
                                                    borderColor:
                                                        VEHICLE_TYPE_TRANSLUCENT_COLORS[type],
                                                }}
                                            />
                                            <PageText
                                                className={cn(styles.MapVehiclesSidebarStationName)}
                                            >
                                                {station.name}
                                            </PageText>
                                        </li>
                                    ))}
                            </div>
                        )}
                        <div className={cn(styles.MapVehiclesSidebarActiveStations)}>
                            <div
                                className={cn(styles.MapVehiclesSidebarActiveBorder)}
                                style={{ backgroundColor: VEHICLE_TYPE_COLORS[type] }}
                            />
                            <li className={cn(styles.MapVehiclesSidebarStation)}>
                                <div className={cn(styles.MapVehiclesSidebarVehicleMarker)}>
                                    <MapVehicleMarker
                                        boardId={boardId}
                                        routeNumber={routeNumber}
                                        type={type}
                                        isCourseEast={false}
                                        additionalInfo={false}
                                        course={90}
                                    />
                                </div>
                                <PageText className={cn(styles.MapVehiclesSidebarStationName)}>
                                    {stations[nearestStationIndex].name}
                                </PageText>
                            </li>
                            {afterNearest.map((station) => (
                                <li className={cn(styles.MapVehiclesSidebarStation)}>
                                    <div
                                        className={cn(styles.MapVehiclesSidebarBullet)}
                                        style={{ borderColor: VEHICLE_TYPE_COLORS[type] }}
                                    />
                                    <PageText className={cn(styles.MapVehiclesSidebarStationName)}>
                                        {station.name}
                                    </PageText>

                                    <PageText>{station.arrivalTime}</PageText>
                                </li>
                            ))}
                            {beforeEnd.length > 0 && (
                                <div
                                    className={cn(styles.MapVehiclesSidebarHiddenStationWrapper)}
                                    onClick={() => {
                                        setBeforeOpened(!beforeOpened);
                                    }}
                                >
                                    {!beforeOpened && (
                                        <div className={cn(styles.MapVehiclesSidebarHiddenCount)}>
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
                                            className={cn(styles.MapVehiclesSidebarHiddenArrow, {
                                                [styles.MapVehiclesSidebarHiddenArrow_opened]:
                                                    beforeOpened,
                                            })}
                                        />
                                    </div>
                                    {beforeOpened &&
                                        beforeEnd.map((station) => (
                                            <li className={cn(styles.MapVehiclesSidebarStation)}>
                                                <div
                                                    className={cn(styles.MapVehiclesSidebarBullet)}
                                                    style={{
                                                        borderColor: VEHICLE_TYPE_COLORS[type],
                                                    }}
                                                />
                                                <PageText
                                                    className={cn(
                                                        styles.MapVehiclesSidebarStationName,
                                                    )}
                                                >
                                                    {station.name}
                                                </PageText>
                                                <PageText>{station.arrivalTime}</PageText>
                                            </li>
                                        ))}
                                </div>
                            )}
                            {nearestStationIndex !== stations.length - 1 && (
                                <li className={cn(styles.MapVehiclesSidebarStation)}>
                                    <div
                                        className={cn(
                                            styles.MapVehiclesSidebarBullet,
                                            styles.MapVehiclesSidebarBullet_big,
                                        )}
                                        style={{ borderColor: VEHICLE_TYPE_COLORS[type] }}
                                    />
                                    <PageText className={cn(styles.MapVehiclesSidebarStationName)}>
                                        {stations[stations.length - 1].name}
                                    </PageText>
                                    <PageText>{stations[stations.length - 1].arrivalTime}</PageText>
                                </li>
                            )}
                        </div>
                    </ul>
                </div>
                <Divider />
                <div className={cn(styles.MapVehiclesSidebarAdditionalWrapper)}>
                    <Typography variant="h3">{`Подробнее ${additionalHeader[type]}`}</Typography>
                    <div className={cn(styles.MapVehiclesSidebarAdditional)}>
                        <div className={cn(styles.MapVehiclesSidebarOperatorWrapper)}>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Перевозчик
                            </span>
                            <Image src={operatorPic} layout="intrinsic" alt="Перевозчик" />
                            <div>
                                <span className={cn(styles.MapVehiclesSidebarAdditionalTitle)}>
                                    {vehicleOperator.name}
                                </span>
                                <br />
                                <span className={cn(styles.MapVehiclesSidebarAdditionalSubitle)}>
                                    {vehicleOperator.subsidiary}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Бортномер
                            </span>
                            <br />
                            <span className={cn(styles.MapVehiclesSidebarBoardId)}>{boardId}</span>
                        </div>
                        <div className={cn(styles.MapVehiclesSidebarLabelWrapper)}>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Госномер
                            </span>
                            <div className={cn(styles.MapVehiclesSidebarRoadNumberWrapper)}>
                                <div className={cn(styles.MapVehiclesSidebarRoadNumber)}>
                                    {stateNumber.number.split(' ').map((part) => (
                                        <span key={part}>{part}</span>
                                    ))}
                                </div>
                                <div className={cn(styles.MapVehiclesSidebarRegionWrapper)}>
                                    <span className={cn(styles.MapVehiclesSidebarRegionNumber)}>
                                        {stateNumber.region}
                                    </span>
                                    <span className={cn(styles.MapVehiclesSidebarRegion)}>RUS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className={cn(styles.MapVehiclesSidebarAdditional)}>
                        <div className={cn(styles.MapVehiclesSidebarModelWrapper)}>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Модель машины
                            </span>
                            <Image src={modelPic} layout="intrinsic" alt="Модель" />
                            <div>
                                <span className={cn(styles.MapVehiclesSidebarAdditionalTitle)}>
                                    {vehicleModel.name}
                                </span>
                                <br />
                                <span className={cn(styles.MapVehiclesSidebarAdditionalSubitle)}>
                                    {vehicleModel.factory}
                                </span>
                            </div>
                        </div>
                        <div className={cn(styles.MapVehiclesSidebarLabelWrapper)}>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Заводской номер
                            </span>
                            <span className={cn(styles.MapVehiclesSidebarFactoryNumber)}>
                                {factoryNumber}
                            </span>
                        </div>
                        <div className={cn(styles.MapVehiclesSidebarLabelWrapper)}>
                            <span className={cn(styles.MapVehiclesSidebarAdditionalLabel)}>
                                Год выпуска
                            </span>
                            <span className={cn(styles.MapVehiclesSidebarManufactureYear)}>
                                {manufactureYear}
                            </span>
                            <span className={cn(styles.MapVehiclesSidebarManufactureYearDiff)}>
                                {`${manufactureYearDiff} ${getNoun(
                                    manufactureYearDiff,
                                    'год',
                                    'года',
                                    'лет',
                                )} назад`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
