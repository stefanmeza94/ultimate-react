import styles from "./CountryList.module.css";
import { City } from "../App";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

type CountryListProps = {
  cities: City[];
  isLoading: boolean;
};

export type Country = { country: string; emoji: string };

const CountryList = ({ cities, isLoading }: CountryListProps) => {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on the city on the map" />;

  const countries = cities.reduce((arr: any, city: City) => {
    if (!arr.map((el: City) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((c: Country) => (
        <CountryItem country={c} key={c.country} />
      ))}
    </ul>
  );
};

export default CountryList;

// 215 - storying state in url
