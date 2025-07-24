import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoutes;
