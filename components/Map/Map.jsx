import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ScaleControl } from "react-leaflet";
import classNames from "classnames/bind";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { MapLocation } from "./Location/MapLocation";
import { MapTransport } from "./Transport/MapTransport";

import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

const cn = classNames.bind(styles);

function Map() {
  const position = [56.838011, 60.597465];

  useEffect(() => {
    (async function init() {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer
      center={position}
      scrollWheelZoom
      attributionControl={null}
      zoom={16}
      className={cn(styles.Map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ScaleControl position="topright" />

      <MapLocation />

      <MapTransport />

      <Marker position={position}>
        <Popup>Popup test</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
