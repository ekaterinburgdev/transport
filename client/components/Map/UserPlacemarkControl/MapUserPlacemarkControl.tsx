import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { UserPlacemarkControl } from 'components/Map/leaflet-extensions/user-placemark-control/user-placemark-control';
import { MovingMarker } from 'components/Map/leaflet-extensions/moving-marker';

export type MapUserPlacemarkControlProps = {
    userPlacemark: MovingMarker;
    options: L.ControlOptions;
    onClick: () => void;
};

export function MapUserPlacemarkControl({
    userPlacemark,
    options,
    onClick,
}: MapUserPlacemarkControlProps) {
    const map = useMap();

    useEffect(() => {
        const userPlacemarkControl = new UserPlacemarkControl(userPlacemark, {
            ...options,
            onClickHandler: onClick,
        }).addTo(map);

        return () => {
            userPlacemarkControl.remove();
        };
    }, [map, userPlacemark, options, onClick]);

    return null;
}
