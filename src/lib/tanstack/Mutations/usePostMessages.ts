import { useMutation } from "@tanstack/react-query";
import {
  MessageType,
  postMessages,
} from "../../supabase/Database/postMessages";

export function usePostMessages() {
  return useMutation({
    mutationKey: ["send_message"],
    mutationFn: async ({ from, payload, channel, sentBy }: MessageType) => {
      return await postMessages({ from, payload, channel, sentBy });
    },
  });
}
