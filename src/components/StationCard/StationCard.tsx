import "./StationCard.scss";
import { GasStation, GasPrice } from "../../utilities/types";

export const StationCard = (props: GasStation) => {
  return (
    <div className="single-station-card">
      <div>
        <h1>{props.title}</h1>
        <p>{props.address}</p>
      </div>
      <div>
        {props.gasPrices.map((price: GasPrice) => {
          return (
            <p>
              {price.gasType} : {price.priceTag}
            </p>
          );
        })}
      </div>
    </div>
  );
};
