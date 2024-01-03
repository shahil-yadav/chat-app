import { FaMagnifyingGlass, FaMessage } from "react-icons/fa6";
import { Input } from "@nextui-org/react";
import React from "react";

const Inp = ({
  value,
  setValue,
  useIcon,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  useIcon?: string;
}) => {
  let Icon = null;
  if (useIcon === "search") {
    Icon = FaMagnifyingGlass;
  } else if (useIcon === "message") {
    Icon = FaMessage;
  }
  return (
    <Input
      className="inline-block max-w-xs"
      variant="bordered"
      classNames={{
        inputWrapper: [
          "bg-black",
          "data-[hover=true]:bg-white/10",
          "group-data-[focus=true]:bg-white/10",
        ],
        input: "group-data-[has-value=true]:text-white",
      }}
      value={value}
      onValueChange={setValue}
      startContent={
        Icon && <Icon color="white" style={{ marginRight: "10px" }} />
      }
    />
  );
};

export default Inp;
