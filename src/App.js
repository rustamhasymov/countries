import { useEffect, useState } from "react";
import { Countries } from "./components/Countries";
import "./App.css";
import { DnD } from "./components/DnD";
import { FirstTask } from "./components/FirstTask";

export const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
      if (response.ok) {
        const { data } = await response.json();
        setCountries(
          data.map((country) => ({ countryName: country.name, countryFlag: country.flag }))
        );
      } else {
        throw new Error(`Bad request! ${response.status}`);
      }
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <div className="App">
      {/* <Countries data={countries} /> */}
      <DnD />
      <FirstTask />
    </div>
  );
};
