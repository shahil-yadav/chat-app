import Channels from "../components/root/Channels";

import Sidebar from "../components/root/Sidebar";
import { WINDOW_HEIGHT } from "../constants/const";
import { Outlet } from "react-router-dom";

const Chats = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-black">
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
