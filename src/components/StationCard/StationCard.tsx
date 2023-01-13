import logo from "../../images/logo-single.png";
import "./StationCard.scss";
import { GasStation, GasTypes } from "../../utilities/types";
import { Link } from "react-router-dom";
import { findPriceByType } from "../../utilities/functions";

interface Props extends GasStation {
  fuelType: GasTypes;
}

export const StationCard = (props: Props) => {
  const gasPrice = findPriceByType(props.gasPrices, props.fuelType);

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
        <p>
          {gasPrice.gasType} : {gasPrice.priceTag}
        </p>
      </div>
    </div>
  );
};
