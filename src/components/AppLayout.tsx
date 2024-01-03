import { Route, Routes } from "react-router-dom";

import Chats from "../pages/Chats";
import Homepage from "../pages/Homepage";
import Messages from "./root/Messages";

import { Toaster } from "react-hot-toast";

import WelcomeScreen from "../ui/WelcomeScreen";
import Error404 from "../pages/Error404";

const AppLayout = () => {
  return (
    <>
      <main className="flex h-screen items-center justify-center bg-black md:hidden">
        <div className="space-y-10 p-10 md:hidden">
          <h1 className="font-thin text-white">
            <span className="text-5xl">Message from</span>
            <span className="ml-2 text-7xl font-semibold text-danger">
              Shahil<span className="text-lg text-lime-400">,</span>
            </span>
          </h1>
          <div>
            <h1 className="text-md font-medium text-white">
              I will be adding the support to mobile screens very soon
            </h1>
            <p className="rounded-lg bg-lime-400 text-lg text-black">
              Grab your laptop, so as to experience this website
            </p>
          </div>
        </div>
      </main>

      <main className="hidden md:block">
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/chats" element={<Chats />}>
            <Route path="/chats/:channelName" element={<Messages />} />
            <Route path="/chats" element={<WelcomeScreen />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Toaster />
    </>
  );
};

export default AppLayout;
