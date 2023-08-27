import { Navigate, useLocation } from "react-router-dom";
import Main from "./Main";

export default function ProtectedRoute({ isLoggedIn, ...props }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={"/sign-in"} state={{ from: location }} replace />;
  }

  return (
    <>
      <Main {...props} />
    </>
  );
}
