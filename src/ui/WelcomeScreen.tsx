import { useAccountContext } from "../context/AccountProvider";
import AnimateText from "./AnimateText";

const WelcomeScreen = () => {
  const { username } = useAccountContext();
  if (!username) return;
  return (
    <div className="flex flex-1 items-center justify-center">
      <AnimateText text={[`Welcome ${username}`]} animate />
    </div>
  );
};

export default WelcomeScreen;
