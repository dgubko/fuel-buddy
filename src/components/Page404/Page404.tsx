import { ErrorMessage } from "../ErrorMessag/ErrorMessage";

export const Page404 = () => {
  return (
    <ErrorMessage
      message="Page 404: Sorry, page does not exist!"
      hasBackButton
    />
  );
};
