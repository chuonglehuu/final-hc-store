import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtecedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = UserAuth();
  if (!user) {
    navigate("/login");
  } else {
    return children;
  }
}

export default ProtecedRoute;
