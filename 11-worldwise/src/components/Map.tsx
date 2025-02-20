import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <p>
        Position: {lat}, {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: "23", lng: "45" })}>Change position</button>
    </div>
  );
};

export default Map;

// 218 - programmatic navigation with useNavigate
