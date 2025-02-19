import styles from "./CityList.module.css";
import { City } from "../App";
import Spinner from "./Spinner";
import CityItem from "./CityItem";

type CityListProps = {
  cities: City[];
  isLoading: boolean;
};

const CityList = ({ cities, isLoading }: CityListProps) => {
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
