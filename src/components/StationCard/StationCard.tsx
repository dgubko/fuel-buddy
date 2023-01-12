import logo from "../../images/logo-single.png";
import "./StationCard.scss";
import { GasStation, GasPrice } from "../../utilities/types";
import { Link } from "react-router-dom";

export const StationCard = (props: GasStation) => {
  return (
    <div className="single-station-card">
      <div>
        <Link id="link-name" to={`/details/${props.cid}`}>
          <img src={logo} alt="logo" />
          <h2>{props.title}</h2>
        </Link>
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
