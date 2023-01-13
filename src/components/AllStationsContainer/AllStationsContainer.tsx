import "./AllStationsContainer.scss";
import { GasStation } from "../../utilities/types";
import { StationCard } from "../StationCard/StationCard";
import { Form } from "../Form/Form";
import { useState } from "react";
import { GasTypes } from "../../utilities/types";

export const AllStationsContainer = (props: any) => {
  const [location, setLocation] = useState<string>("");
  const [fuelType, setFuelType] = useState<GasTypes>("Regular");
  return (
    <div className="all-station-container">
      <Form
        location={location}
        fuelType={fuelType}
        setFuelType={setFuelType}
        setLocation={setLocation}
      />
      {props.allStations.map((station: GasStation) => {
        return <StationCard key={station.cid} {...station} />;
      })}
    </div>
  );
};
