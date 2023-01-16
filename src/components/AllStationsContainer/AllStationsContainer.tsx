import "./AllStationsContainer.scss";
import { GasPrice, GasStation } from "../../utilities/types";
import { StationCard } from "../StationCard/StationCard";
import { Form } from "../Form/Form";
import { useState } from "react";
import { GasTypes } from "../../utilities/types";
import { findPriceByType } from "../../utilities/functions";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";

export const AllStationsContainer = (props: any) => {
  const [location, setLocation] = useState<string>("");
  const [fuelType, setFuelType] = useState<GasTypes>("Regular");

  const filtered = props.allStations
    .filter((station: GasStation) => {
      const matchLocation = station.address
        .toLowerCase()
        .includes(location.toLowerCase());

      const hasPrice = station.gasPrices.some((price: GasPrice) => {
        return price.gasType === fuelType;
      });
      return matchLocation && hasPrice;
    })
    .sort((a: GasStation, b: GasStation) => {
      const gasPriceA = findPriceByType(a.gasPrices, fuelType);
      const gasPriceB = findPriceByType(b.gasPrices, fuelType);
      return gasPriceA.price > gasPriceB.price ? 1 : -1;
    });

  if (props.isLoading) {
    return <LoadingAnimation />;
  }

  if (props.error) {
    return <p className="error-message">{props.error}</p>;
  }

  return (
    <div className="all-station-container">
      <Form
        location={location}
        fuelType={fuelType}
        setFuelType={setFuelType}
        setLocation={setLocation}
      />
      {!filtered.length && (
        <p id="location-error-message">
          There are no stations found in the selected area
        </p>
      )}
      {filtered.map((station: GasStation) => {
        return (
          <StationCard
            key={station.cid}
            {...station}
            fuelType={fuelType}
            removeFromFav={props.removeFromFav}
            favorites={props.favorites}
            addToFav={props.addToFav}
          />
        );
      })}
    </div>
  );
};
