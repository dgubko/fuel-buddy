import "./DetailsPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { GasStation } from "../../utilities/types";

export const DetailsPage = (props: { allStations: GasStation[] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const station = props.allStations.find((station) => {
    return station.cid === id;
  });

  if (!station) {
    navigate("/Page404");
    return null;
  }

  return (
    <div className="details">
      <h2>{station.title}</h2>
      <h3>{station.address}</h3>
      <p>Reviews: {station.reviewsCount}</p>
      <p>Phone number: {station.phone}</p>
      <p className="details-prices-section">
        {station.gasPrices.map((price: any) => {
          return (
            <p className="details-price">
              {price.gasType} : {price.priceTag}
            </p>
          );
        })}
      </p>
    </div>
  );
};
