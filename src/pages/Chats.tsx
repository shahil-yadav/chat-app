import Channels from "../components/root/Channels";

import Sidebar from "../components/root/Sidebar";
import { WINDOW_HEIGHT } from "../constants/const";
import { Outlet } from "react-router-dom";

const Chats = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-black">
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

      {/* Laptop Screens */}
      <div
        className={`hidden w-3/4 min-w-[720px] md:flex`}
        style={{
          height: `${WINDOW_HEIGHT}px`,
        }}
      >
        <Sidebar />
        <Channels />
        <Outlet />
      </div>
    </main>
  );
};

export default Chats;
