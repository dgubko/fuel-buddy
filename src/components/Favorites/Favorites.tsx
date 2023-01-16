import { Favorite } from "../../utilities/types";
import { FavCard } from "../FavCard/FavCard";

interface Props {
  removeFromFav: (value: string) => void;
  favorites: Favorite[];
}

export const Favorites = (props: Props) => {
  return (
    <div className="fav-card">
      {!props.favorites.length ? (
        <p className="no-fav-message">You have no favorite gas stations yet!</p>
      ) : (
        props.favorites.map((fav: Favorite) => {
          return (
            <FavCard
              key={fav.cid}
              {...fav}
              removeFromFav={props.removeFromFav}
            />
          );
        })
      )}
    </div>
  );
};
