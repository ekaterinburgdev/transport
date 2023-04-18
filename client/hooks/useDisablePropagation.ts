import { useEffect } from 'react';
import L from 'leaflet';

export const useDisablePropagation = (ref: React.MutableRefObject<HTMLElement>) => {
    useEffect(() => {
        if (ref.current) {
            L.DomEvent.disableClickPropagation(ref.current);
            L.DomEvent.disableScrollPropagation(ref.current);
        }
    }, [ref.current]);
};
