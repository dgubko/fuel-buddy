import { GasPrice, Favorite } from "../../utilities/types";
import heart from "../../images/fav.svg";
import heartFilled from "../../images/fav-filled.svg";

interface Props extends Favorite {
  removeFromFav: (value: string) => void;
}

export const FavCard = (props: Props) => {
  const handleFavorite = () => {
    props.removeFromFav(props.cid);
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.address}</h2>

      {props.gasPrices.map((price: GasPrice) => {
        return (
          <p>
            {price.gasType} : {price.priceTag}
          </p>
        );
      })}
      <button className="heart-button" onClick={handleFavorite}>
        <img src={heartFilled} />
      </button>
    </div>
  );
};
