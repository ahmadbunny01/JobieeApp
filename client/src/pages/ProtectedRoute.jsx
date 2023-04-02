import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  useEffect(() => {
    if (!user) {
      return navigate("/landing");
    }
  }, [user, navigate]);
  return children;
};

export default ProtectedRoute;
