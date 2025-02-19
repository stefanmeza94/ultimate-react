import styles from "./CityList.module.css";
import { City } from "../App";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

type CityListProps = {
  cities: City[];
  isLoading: boolean;
};

const CityList = ({ cities, isLoading }: CityListProps) => {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on the city on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
