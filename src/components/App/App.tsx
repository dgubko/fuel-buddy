import "./App.scss";
import logo from "../../images/logo-new.svg";
import { useEffect, useState } from "react";
import { getGasStations } from "../../apiCalls/gasStations";
import { AllStationsContainer } from "../AllStationsContainer/AllStationsContainer";
import { GasStation } from "../../utilities/types";

function App() {
  const [allStations, setAllStations] = useState<GasStation[]>([]);

  useEffect(() => {
    getGasStations().then((data) => {
      setAllStations(
        data.filter((station: GasStation) => {
          return station.gasPrices;
        })
      );
    });
  }, []);

  return (
    <div className="App">
      <header>
        <img src={logo} alt="Fuel Buddy Logo" />
      </header>
      <AllStationsContainer allStations={allStations} />
    </div>
  );
}

export default App;
