import logo from "../../images/logo-single.png";
import "./StationCard.scss";
import { Favorite, GasStation, GasTypes } from "../../utilities/types";
import { Link } from "react-router-dom";
import { findPriceByType } from "../../utilities/functions";
import heart from "../../images/fav.svg";
import heartFilled from "../../images/fav-filled.svg";
import { useState } from "react";

interface Props extends GasStation {
  fuelType: GasTypes;
  favorites: any[];
  addToFav: (value: Favorite) => void;
  removeFromFav: (value: string) => void;
}

export const StationCard = (props: Props) => {
  const gasPrice = findPriceByType(props.gasPrices, props.fuelType);

  const isFavorited = props.favorites.some((fav) => {
    return fav.cid === props.cid;
  });

  const handleFavorite = () => {
    if (!isFavorited) {
      const newItem = {
        title: props.title,
        address: props.address,
        gasPrices: props.gasPrices,
        cid: props.cid,
      };
      props.addToFav(newItem);
    } else {
      props.removeFromFav(props.cid);
    }
  };

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
        <button className="heart-button" onClick={handleFavorite}>
          <img src={isFavorited ? heartFilled : heart} />
        </button>
      </div>
    </div>
  );
};
