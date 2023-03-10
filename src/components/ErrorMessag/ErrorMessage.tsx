import "./ErrorMessage.scss";
import gasStation from "../../images/gas-station.png";
import { Link } from "react-router-dom";

export const ErrorMessage = ({
  message,
  hasBackButton,
}: {
  message: string;
  hasBackButton?: boolean;
}) => {
  return (
    <div className="error-message">
      <img src={gasStation} />
      <h2>Oops!</h2>
      <p>{message}</p>
      {hasBackButton && (
        <Link to="/" className="primary-btn">
          Back to Gas Search
        </Link>
      )}
    </div>
  );
};
