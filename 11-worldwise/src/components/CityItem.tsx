import { City } from "../App";

const CityItem = ({ city }: { city: City }) => {
  return <li>{city.cityName}</li>;
};

export default CityItem;
