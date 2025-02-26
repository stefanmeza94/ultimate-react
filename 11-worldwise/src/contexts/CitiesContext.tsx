import { useState, useEffect, createContext, useContext } from "react";
import { City } from "../App";

export const BASE_URL = "http://localhost:8000";

export type CityContext =
  | {
      isLoading: boolean;
      cities: City[];
      currentCity?: City; // Optional because it starts as undefined
      getCity: (id: string) => void;
    }
  | undefined;

const CitiesContext = createContext<CityContext>(undefined);

function CityProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City>();

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert("There was an error loading city...");
    } finally {
      setIsLoading(false);
    }
  }

  return <CitiesContext.Provider value={{ isLoading, cities, currentCity, getCity }}>{children}</CitiesContext.Provider>;
}

function useCities() {
  const context = useContext<CityContext>(CitiesContext);
  if (context === undefined) throw new Error("CityContext was used outside of the CityProvider");
  return context;
}

export { CityProvider, useCities };
