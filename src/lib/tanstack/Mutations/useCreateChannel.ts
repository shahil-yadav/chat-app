import { useMutation } from "@tanstack/react-query";
import { Channel, createChannel } from "../../supabase/Database/createChannel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateChannel() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ channelName, channelLeader }: Channel) => {
      await createChannel({
        channelLeader,
        channelName,
      });
    },
    onSuccess: () => {
      navigate(0);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return mutation;
}
