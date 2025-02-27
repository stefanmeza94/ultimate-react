import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";

const Map = () => {
  const { cities } = useCities();

  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<number[]>([40, 0]);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const { cityName, emoji, position } = city;
          return (
            <Marker position={[position.lat, position.lng]} key={city.id}>
              <Popup>
                <span>{emoji}</span>
                <span>{cityName}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      ,
    </div>
  );
};

export default Map;

// 232 - Interacting with the map
