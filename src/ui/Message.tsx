import { Avatar } from "@nextui-org/react";

const Message = ({
  state,
  data,
}: {
  state: "sent" | "recieved";
  data: {
    from: string;
    body: string;
  };
}) => {
  if (state === "recieved")
    return (
      <div className="flex items-end">
        <Avatar name={data.from} size="lg" className="mr-4" />
        <div className="w-3/4 min-w-60 rounded-xl rounded-bl-none border border-white/15 p-4 text-white">
          <p>{data.body}</p>
        </div>
      </div>
    );
  if (state === "sent")
    return (
      <div className="flex justify-end">
        <div className="w-3/4 min-w-60 rounded-xl rounded-br-none border border-white/15 p-4 text-white">
          <p>{data.body}</p>
        </div>
      </div>
    );
};

export default Message;
