import { useAccountContext } from "../context/AccountProvider";
import Authentication from "./Authentication";
import { Navigate } from "react-router-dom";

function Homepage() {
  const { isSignedIn } = useAccountContext();
  return isSignedIn ? <Navigate to="/chats" /> : <Authentication />;
}

export default Homepage;
