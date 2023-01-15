import { Favorite } from "../../utilities/types";
import { FavCard } from "../FavCard/FavCard";

interface Props {
  removeFromFav: (value: string) => void;
  favorites: Favorite[];
}

export const Favorites = (props: Props) => {
  return (
    <div>
      {props.favorites.map((fav: Favorite) => {
        return (
          <FavCard key={fav.cid} {...fav} removeFromFav={props.removeFromFav} />
        );
      })}
    </div>
  );
};
