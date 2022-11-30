import { useEffect } from 'react';
import { useMap, ZoomControlProps } from 'react-leaflet';

import { ZoomControl } from 'components/leaflet-extensions/zoom-control/zoom-control';

export function MapZoomControl(props: ZoomControlProps) {
    const map = useMap();

    useEffect(() => {
        const zoomControl = new ZoomControl(props).addTo(map);

        return () => {
            zoomControl.remove();
        };
    }, [map, props]);

    return null;
}
