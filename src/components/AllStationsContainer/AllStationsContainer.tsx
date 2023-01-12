import "./AllStationsContainer.scss";
import { GasStation } from "../../utilities/types";
import { StationCard } from "../StationCard/StationCard";

export const AllStationsContainer = (props: any) => {
  return (
    <div className="all-station-container">
      {props.allStations.map((station: GasStation) => {
        return <StationCard key={station.cid} {...station} />;
      })}
    </div>
  );
};
