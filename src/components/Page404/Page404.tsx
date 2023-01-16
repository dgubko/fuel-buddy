import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div>
      <h1>Sorry page does not exist</h1>
      <Link id="go-back-button" to="/">
        Go back
      </Link>
    </div>
  );
};
