import { useMapEvent } from 'react-leaflet';

export const MapLocation = () => {
    const map = useMapEvent('load', (e) => {
        map.locate({ setView: true, maxZoom: 16 });
    });

    return null;
};
