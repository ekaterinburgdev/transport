import { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';

const yekaterinburg = [54.838011, 60.597465];

export const MapLocation = () => {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        locationfound(e) {
            if (!position) {
                map.setView(e.latlng, map.getZoom());
            }

            setPosition(e.latlng);
        },
    });

    map.locate({ watch: true, maxZoom: 16 });

    return (
        <Marker position={position || yekaterinburg}>
            <Popup>Your location</Popup>
        </Marker>
    );
};
