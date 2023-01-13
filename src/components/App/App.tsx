import "./App.scss";
import logo from "../../images/logo-new.svg";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getGasStations } from "../../apiCalls/gasStations";
import { AllStationsContainer } from "../AllStationsContainer/AllStationsContainer";
import { GasStation } from "../../utilities/types";
import { DetailsPage } from "../DetailsPage/DetailsPage";
import { Page404 } from "../Page404/Page404";

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
      <Routes>
        <Route
          path="/"
          element={<AllStationsContainer allStations={allStations} />}
        />
        <Route
          path="/details/:id"
          element={<DetailsPage allStations={allStations} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
