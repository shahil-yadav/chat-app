import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase/config";
import { useNavigate } from "react-router-dom";

interface initType {
  isSignedIn: boolean;
  userId: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  onlineUsers: object;
  setOnlineUsers: React.Dispatch<React.SetStateAction<object>>;
}
const init: initType = {
  isSignedIn: false,
  userId: "",
  username: "",
  setUsername: () => {},
  onlineUsers: {},
  setOnlineUsers: () => {},
};

const AccountContext = createContext(init);

function AccountProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(init.isSignedIn);
  const [userId, setUserId] = useState(init.userId);
  const [username, setUsername] = useState(init.username);
  const [onlineUsers, setOnlineUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (session && !userId) {
        setUserId(session.user.id);
        setUsername(session.user.user_metadata.name);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
        setUserId("");
        setUsername("");
        navigate("/");
      }

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        setIsSignedIn(false);
        setUserId("");
        navigate("/");
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      // call unsubscribe to remove the callback
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    isSignedIn,
    userId,
    onlineUsers,
    setOnlineUsers,
    username,
    setUsername,
  };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

function useAccountContext() {
  const accountContext = useContext(AccountContext);

  if (!accountContext)
    throw new Error("Account Context was used outside the Provider");

  return accountContext;
}

export { AccountProvider, useAccountContext };
