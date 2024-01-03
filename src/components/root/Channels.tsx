import { useState } from "react";
import { ScrollShadow, Spinner } from "@nextui-org/react";

import ChannelCard from "../../ui/ChannelCard";
import Inp from "../../ui/Inp";

import { NAV_HEIGHT, WINDOW_HEIGHT } from "../../constants/const";
import { useGetJoinedChannels } from "../../lib/tanstack/Query/useGetJoinedChannels";

const Channels = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const channels = useGetJoinedChannels();
  return (
    <div className="h-full w-[35%] space-y-2">
      <div
        className={`flex items-center justify-center`}
        style={{
          height: NAV_HEIGHT,
        }}
      >
        <Inp useIcon="search" value={query} setValue={setQuery} />
      </div>
      <ScrollShadow
        hideScrollBar
        className={`flex flex-col items-center space-y-4 lg:px-5`}
        style={{
          height: `${WINDOW_HEIGHT - NAV_HEIGHT}px`,
        }}
      >
        {channels.isPending && (
          <div className="flex h-[82%] justify-center">
            <Spinner
              label="Fetching your channels"
              color="secondary"
              labelColor="secondary"
            />
          </div>
        )}
        {channels.data?.map((channel) => {
          return (
            <ChannelCard
              leader={channel.Channels.leader}
              name={channel.channel}
              key={channel.channel}
              state={state}
              setState={setState}
            />
          );
        })}
      </ScrollShadow>
    </div>
  );
};

export default Channels;
