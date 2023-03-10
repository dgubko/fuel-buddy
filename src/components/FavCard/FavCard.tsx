import "./FavCard.scss";
import { GasPrice, Favorite } from "../../utilities/types";
import logo from "../../images/logo-single.png";
import heartFilled from "../../images/fav-filled.svg";
import { Link } from "react-router-dom";

interface Props extends Favorite {
  removeFromFav: (value: string) => void;
}

export const FavCard = ({
  cid,
  title,
  totalScore,
  reviewsCount,
  address,
  gasPrices,
  removeFromFav,
}: Props) => {
  const handleFavorite = () => {
    removeFromFav(cid);
  };

  return (
    <div className="fav-card card">
      <div>
        <Link className="link-name" to={`/details/${cid}`}>
          <img src={logo} alt="logo" />
          <h2>{title}</h2>
        </Link>
        <div className="review">
          <p>
            <span>⭐️ {totalScore}</span>
            <span>({reviewsCount})</span>
          </p>
          <button
            className="heart-button"
            aria-label="Favorite"
            onClick={handleFavorite}
          >
            <img src={heartFilled} alt="heart" />
          </button>
        </div>
      </div>
      <p>{address}</p>
      <div className="gas-prices-section">
        {gasPrices.map((price: GasPrice) => {
          return (
            <p className="gas-price">
              <span>{price.gasType}</span>
              <span>{price.priceTag}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};
