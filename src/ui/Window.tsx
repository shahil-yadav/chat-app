import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ReactElement } from "react";
import BtnIcon from "./BtnIcon";
import { IconType } from "react-icons";
import { FaTrash } from "react-icons/fa6";

const Window = ({
  icon,
  aria_label,
  label,
  children,
  action,
  actionState,
  actionFn,
}: {
  label: string;
  aria_label: string;
  children: ReactElement;
  icon: IconType;
  action: string;
  actionState: boolean;
  actionFn: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <BtnIcon
        Icon={icon}
        aria_label={aria_label}
        className="h-[70px] w-[70px]"
        onPress={onOpen}
      />
      <Modal
        backdrop="blur"
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-black/10"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white">{label}</h1>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className={`${
                    icon === FaTrash ? "bg-danger" : "bg-lime-400"
                  }`}
                  onPress={actionFn}
                  isLoading={actionState}
                >
                  {action}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Window;
