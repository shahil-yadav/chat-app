import { useState } from "react";

import { Button } from "@nextui-org/react";

import { useAccountContext } from "../../context/AccountProvider";
import { useCreateChannel } from "../../lib/tanstack/Mutations/useCreateChannel";
import { useGetChannels } from "../../lib/tanstack/Query/useGetChannels";
import { useJoinChannel } from "../../lib/tanstack/Mutations/useJoinChannel";

import Window from "../../ui/Window";
import Inp from "../../ui/Inp";

import SuggestionSearch from "../../ui/SuggestionSearch";

import {
  FaFacebookMessenger,
  FaDoorOpen,
  FaPlus,
  FaRightFromBracket,
} from "react-icons/fa6";
import { SIDEBAR_WIDTH } from "../../constants/const";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase/config";

const Sidebar = () => {
  const [createChannelName, setCreateChannelName] = useState("");
  const [joinChannelName, setJoinChannelName] = useState("");

  const channels = useGetChannels();
  const createChannel = useCreateChannel();
  const joinChannel = useJoinChannel();
  const { userId } = useAccountContext();

  function handleCreateChannel() {
    if (!createChannelName) return;
    createChannel.mutate({
      channelLeader: userId,
      channelName: createChannelName,
    });
  }

  function handleJoinChannel() {
    if (!joinChannelName) return;
    joinChannel.mutate({
      channelName: joinChannelName,
      userId,
    });
  }
  const navigate = useNavigate();
  return (
    <nav className={`h-full w-[${SIDEBAR_WIDTH}px] bg-black`}>
      <ul>
        <li>
          <Button
            isIconOnly
            onPress={() => {
              navigate("/chats");
            }}
            className="h-[70px] w-[70px] rounded-full bg-lime-400"
          >
            <FaFacebookMessenger size={40} />
          </Button>
        </li>
        <li>
          <Window
            icon={FaDoorOpen}
            aria_label="Join"
            label="Join Channel"
            action="Join"
            actionState={joinChannel.isPending}
            actionFn={handleJoinChannel}
          >
            <SuggestionSearch
              label="Join Channel"
              data={channels.data}
              toAccess="name"
              value={joinChannelName}
              setValue={setJoinChannelName}
            />
          </Window>
        </li>
        <li>
          <Window
            icon={FaPlus}
            aria_label="Create"
            label="Create Channel"
            action="Create"
            actionState={createChannel.isPending}
            actionFn={handleCreateChannel}
          >
            <Inp value={createChannelName} setValue={setCreateChannelName} />
          </Window>
        </li>
        <li>
          <Window
            icon={FaRightFromBracket}
            aria_label="Sign-out"
            label="Do you wish to sign out from your account ?"
            action="Sign out"
            actionState={false}
            actionFn={() => {
              supabase.auth.signOut();
            }}
          >
            <p className="text-white">
              We wish to see you back soon! Thanks for Visting
            </p>
          </Window>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
