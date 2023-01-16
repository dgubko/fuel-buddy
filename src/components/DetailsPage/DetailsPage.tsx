import "./DetailsPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Favorite, GasStation } from "../../utilities/types";
import heart from "../../images/fav.svg";
import heartFilled from "../../images/fav-filled.svg";
import { StationMap } from "../Maps/StationMap";

interface Props {
  allStations: GasStation[];
  favorites: Favorite[];
  addToFav: (value: Favorite) => void;
  removeFromFav: (value: string) => void;
}

export const DetailsPage = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isFavorited = props.favorites.some((fav) => {
    return fav.cid === id;
  });

  const station = props.allStations.find((station) => {
    return station.cid === id;
  });

  if (!station) {
    navigate("/Page404");
    return null;
  }

  const handleFavorite = () => {
    if (!isFavorited) {
      const newItem = {
        title: station.title,
        address: station.address,
        gasPrices: station.gasPrices,
        cid: station.cid,
      };
      props.addToFav(newItem);
    } else {
      props.removeFromFav(station.cid);
    }
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="details">
      <h2>{station.title}</h2>
      <h3>{station.address}</h3>
      <p className="details-review-count">Reviews: {station.reviewsCount}</p>
      <p className="details-phone-number">Phone number: {station.phone}</p>
      <p className="details-prices-section">
        {station.gasPrices.map((price: any) => {
          return (
            <p className="details-price">
              {price.gasType} : {price.priceTag}
            </p>
          );
        })}
      </p>
      <button onClick={handleClick}>Go back</button>
      <button className="heart-button" onClick={handleFavorite}>
        <img src={isFavorited ? heartFilled : heart} />
      </button>
      <StationMap lat={station.location.lat} lng={station.location.lng} />
    </div>
  );
};
