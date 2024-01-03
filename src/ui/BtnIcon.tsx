import { Button, Spinner } from "@nextui-org/react";
import { IconType } from "react-icons";
import { FaTrash } from "react-icons/fa6";

const BtnIcon = ({
  className,
  aria_label,
  Icon,
  onPress,
  isLoading,
}: {
  Icon: IconType;
  aria_label: string;
  className: string;
  isLoading?: boolean;
  onPress?: () => void;
}) => {
  const style = {
    color: "",
    variant: "light",
    size: "22px",
    className,
  };
  if (Icon === FaTrash) {
    style.color = "danger";
    style.variant = "solid";
    style.size = "";
    style.className = "";
  }
  return (
    <Button
      variant={style.variant}
      color={style.color}
      className={`${style.className} border-none`}
      isIconOnly
      aria-label={aria_label}
      onPress={onPress}
    >
      {isLoading ? (
        <Spinner color="secondary" />
      ) : (
        <Icon
          className={`${Icon === FaTrash ? "text-white" : "text-lime-400"}`}
          size={style.size}
        />
      )}
    </Button>
  );
};

export default BtnIcon;
