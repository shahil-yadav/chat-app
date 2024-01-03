import { useMutation } from "@tanstack/react-query";
import { joinChannel } from "../../supabase/Database/joinChannel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useJoinChannel() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({
      channelName,
      userId,
    }: {
      channelName: string;
      userId: string;
    }) => {
      await joinChannel({
        channelName,
        userId,
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
