import { useState } from "react";

import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";

import { useAccountContext } from "../../context/AccountProvider";
import { useCreateChannel } from "../../lib/tanstack/Mutations/useCreateChannel";
import { useGetChannels } from "../../lib/tanstack/Query/useGetChannels";
import { useJoinChannel } from "../../lib/tanstack/Mutations/useJoinChannel";

import Window from "../../ui/Window";
import Inp from "../../ui/Inp";

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
      <ul className="mt-5 space-y-4">
        <li className="flex items-center justify-center">
          <Button
            isIconOnly
            onPress={() => {
              navigate("/chats");
            }}
            className="h-[40px] w-[40px] rounded-full bg-lime-400"
          >
            <FaFacebookMessenger size={20} />
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
            <Autocomplete
              label="Join Channel"
              size="md"
              className="max-w-xs"
              classNames={{
                clearButton: "text-white",
                selectorButton: "text-white",
                popoverContent: ["bg-white/20", "text-white"],
              }}
              inputProps={{
                classNames: {
                  inputWrapper: [
                    "bg-black",
                    "data-[hover=true]:bg-white/10",
                    "group-data-[focus=true]:bg-white/10",
                  ],
                  input: "group-data-[has-value=true]:text-white",
                },
              }}
              allowsCustomValue
              defaultItems={channels.data}
              selectedKey={joinChannelName}
              onSelectionChange={(e) => {
                setJoinChannelName(() => e?.toString());
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.name} value={item.name}>
                  {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
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
