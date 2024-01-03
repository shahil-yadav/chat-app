import { useQuery } from "@tanstack/react-query";
import { getMessagesOfChannel } from "../../supabase/Database/getMessagesOfChannel";

export function useGetMessagesOfChannel(channelName: string | undefined) {
  return useQuery({
    queryKey: ["messages", channelName],
    queryFn: async () => {
      return await getMessagesOfChannel(channelName);
    },
  });
}
