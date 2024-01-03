import { Route, Routes } from "react-router-dom";

import Chats from "../pages/Chats";
import Homepage from "../pages/Homepage";
import Messages from "./root/Messages";

import { Toaster } from "react-hot-toast";

import WelcomeScreen from "../ui/WelcomeScreen";

const AppLayout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chats />}>
          <Route path="/chats/:channelName" element={<Messages />} />
          <Route path="/chats" element={<WelcomeScreen />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default AppLayout;
