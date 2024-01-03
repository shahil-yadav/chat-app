import { Avatar, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Window from "./Window";
import { useDeleteChannel } from "../lib/tanstack/Mutations/useDeleteChannel";
import { useAccountContext } from "../context/AccountProvider";

const ChannelCard = ({
  name,
  state,
  setState,
  leader,
}: {
  name: string;
  state?: string;
  leader: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { userId } = useAccountContext();
  const navigate = useNavigate();
  const canDeleteRoom = leader === userId;
  const [buttonState, setButtonState] = useState(false);
  const deleteChannel = useDeleteChannel();

  useEffect(() => {
    if (buttonState === false) return;

    function handle() {
      setButtonState(false);
    }
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, [buttonState]);

  function handleDeleteChannel() {
    deleteChannel.mutate(name);
  }
  return (
    <Button
      onClick={() => {
        if (state !== name) {
          setState(() => name);
          navigate(`/chats/${name}`, { replace: true });
        } else {
          setState(() => "");
          navigate("/chats");
        }
      }}
      fullWidth
      className={`flex h-[90px] cursor-pointer items-center justify-between overflow-hidden rounded-none ${
        state === name && "border-l-5 border-lime-400"
      } bg-neutral-900`}
    >
      <div className="flex items-center justify-center">
        <Avatar name={name} size="lg" className="mx-5" />
        <div className="text-white">
          <h3 className="text-xl font-normal">{name}</h3>
        </div>
      </div>

      <div className={`${canDeleteRoom ? "" : "hidden"}`}>
        {!buttonState ? (
          <Button
            isIconOnly
            onClick={() => {
              setButtonState(true);
            }}
            className="bg-neutral-900 text-white"
          >
            :
          </Button>
        ) : (
          <Window
            icon={FaTrash}
            aria_label="Create"
            label="Delete Channel"
            action="Delete"
            actionState={deleteChannel.isPending}
            actionFn={handleDeleteChannel}
          >
            <p className="text-danger">This action cannot be undone.</p>
          </Window>
        )}
      </div>
    </Button>
  );
};

export default ChannelCard;
