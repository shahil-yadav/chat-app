import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaArrowDown } from "react-icons/fa6";
import BtnIcon from "../../ui/BtnIcon";
import { NAV_HEIGHT, WINDOW_HEIGHT } from "../../constants/const";
import { Button, ScrollShadow, Textarea } from "@nextui-org/react";
import { useGetJoinedChannels } from "../../lib/tanstack/Query/useGetJoinedChannels";
import { useNavigate, useParams } from "react-router-dom";
import { usePostMessages } from "../../lib/tanstack/Mutations/usePostMessages";
import { useAccountContext } from "../../context/AccountProvider";
import { useGetMessagesOfChannel } from "../../lib/tanstack/Query/useGetMessagesOfChannel";
import Message from "../../ui/Message";
import { supabase } from "../../lib/supabase/config";

const REST_HT = WINDOW_HEIGHT - NAV_HEIGHT;

const Messages = () => {
  const [text, setText] = useState("");
  const [newMsg, setNewMsg] =
    useState<React.Dispatch<React.SetStateAction<object>>>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { channelName } = useParams();
  const navigate = useNavigate();

  const { userId, username } = useAccountContext();

  const joinedChannels = useGetJoinedChannels();
  const messages = useGetMessagesOfChannel(channelName);
  const sendMessage = usePostMessages();

  function scrollLast() {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }
  useEffect(() => {
    const isThere = joinedChannels.data?.find(
      (channel) => channel.channel === channelName,
    );

    if (!isThere) {
      navigate("/chats");
    }

    // Subscribe to Real Time Events
    supabase
      .channel("channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Messages",
          filter: `channel=eq.${channelName}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          setNewMsg((prev) =>
            !prev ? [{ ...payload.new }] : [...prev, payload.new],
          );
        },
      )
      .subscribe();

    scrollLast();
  }, [joinedChannels.data, channelName, navigate, newMsg]);

  function handleSendMessage() {
    if (!text || !userId || !channelName) return;
    sendMessage.mutate(
      {
        from: userId,
        payload: text,
        channel: channelName,
        sentBy: username,
      },
      {
        onSuccess: () => {
          setText(() => "");
        },
      },
    );
  }
  return (
    <div
      className={`flex-1 overflow-hidden px-5`}
      style={{
        maxHeight: `${WINDOW_HEIGHT}px`,
      }}
    >
      <div
        className={`flex items-center justify-between`}
        style={{
          height: `${NAV_HEIGHT}px`,
        }}
      >
        <span className="text-2xl font-bold text-white">{channelName}</span>
        <span className="text-white">:</span>
      </div>
      <div
        className={`relative flex flex-col`}
        style={{
          height: `${REST_HT}px`,
        }}
      >
        <ScrollShadow className={`h-full space-y-8`}>
          {messages.data?.map((message, idx) => (
            <Message
              key={idx}
              state={message.from === userId ? "sent" : "recieved"}
              data={{
                from: message.sentBy,
                body: message.payload,
              }}
            />
          ))}
          {newMsg &&
            newMsg.map((message, idx) => (
              <Message
                key={idx}
                state={message.from === userId ? "sent" : "recieved"}
                data={{
                  from: message.sentBy,
                  body: message.payload,
                }}
              />
            ))}
          <div ref={scrollRef} />
        </ScrollShadow>
        <Button
          isIconOnly
          onPress={() => {
            scrollLast();
          }}
          className="absolute bottom-[80px] right-2 rounded-full bg-lime-400"
        >
          <FaArrowDown />
        </Button>

        <div className="flex items-center justify-center">
          <Textarea
            minRows={1}
            variant="bordered"
            className="w-full border-white text-white data-[focus-within=true]:rounded-lg data-[focus-within=true]:border data-[focus-within=true]:border-lime-400"
            value={text}
            onValueChange={setText}
          />
          <BtnIcon
            Icon={FaPaperPlane}
            isLoading={sendMessage.isPending}
            aria_label="Messages"
            className="h-[70px] w-[70px]"
            onPress={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;