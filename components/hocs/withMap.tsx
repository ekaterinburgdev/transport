import React from 'react';

import { useMap } from 'react-leaflet';

export function withMap<Props extends object>(Component: React.ComponentType<Props>) {
    return function WrappedComponent(props: Props) {
      const map = useMap();

      return <Component {...props} map={map} />;
    };
}