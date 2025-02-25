import { useState, useEffect, createContext, useContext } from "react";
import { City } from "../App";

const BASE_URL = "http://localhost:8000";

export type CitiesContext =
  | {
      isLoading: boolean;
      cities: City[];
    }
  | undefined;

const CitiesContext = createContext<CitiesContext>(undefined);

function CityProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);

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

  return <CitiesContext.Provider value={{ isLoading, cities }}>{children}</CitiesContext.Provider>;
}

function useCities() {
  const context = useContext<CitiesContext>(CitiesContext);
  if (context === undefined) throw new Error("CityContext was used outside of the CityProvider");
  return context;
}

export { CityProvider, useCities };

// 229 - Finishing the city view
