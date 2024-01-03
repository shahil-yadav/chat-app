import { useMutation } from "@tanstack/react-query";
import { deleteChannel } from "../../supabase/Database/deleteChannel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteChannel = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (channelName: string) => {
      return await deleteChannel(channelName);
    },
    mutationKey: ["delete"],
    onSuccess: () => {
      navigate(0);
    },
    onError: () => {
      toast.error("Please try again");
    },
  });
};

export { useDeleteChannel };
