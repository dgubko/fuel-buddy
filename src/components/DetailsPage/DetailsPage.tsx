import "./DetailsPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Favorite, GasPrice, GasStation } from "../../utilities/types";
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

  const isFavorited = props.favorites.some((fav) => fav.cid === id);
  const station = props.allStations.find((station) => station.cid === id);

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
        reviewsCount: station.reviewsCount,
        totalScore: station.totalScore,
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
      <div className="info">
        <section className="header">
          <button
            className="heart-button"
            aria-label="Favorite"
            onClick={handleFavorite}
          >
            <img src={isFavorited ? heartFilled : heart} alt="heart" />
          </button>
          <h1>{station.title}</h1>
        </section>
        <section>
          <div>
            <h3>{station.address}</h3>
            <p className="details-phone-number">☎ {station.phone}</p>
          </div>
        </section>
        <div className="details-features">
          <h5>Features & Amenities</h5>
          <div>
            {station.categories.map((category) => (
              <p className="category-tag">{category}</p>
            ))}
          </div>
        </div>
        <div className="gas-prices-section">
          {station.gasPrices.map((price: GasPrice) => {
            return (
              <p className="gas-price">
                <span>{price.gasType}</span>
                <span>{price.priceTag}</span>
              </p>
            );
          })}
        </div>
        <button className="primary-btn" onClick={handleClick}>
          Go back
        </button>
      </div>
      <p className="details-review-count">
        <div>⭐️ {station.totalScore}</div>
        <div>based on</div>
        <div>{station.reviewsCount} reviews</div>
      </p>
      <StationMap lat={station.location.lat} lng={station.location.lng} />
    </div>
  );
};
