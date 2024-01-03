import { supabase } from "../config";

type T_JoinedChannels = {
  channel: string;
  Channels: {
    leader: string;
  };
}[];

async function getJoinedChannels(userId: string) {
  const { data: ChannelsParticipants, error } = await supabase
    .from("ChannelsParticipants")
    .select(`channel,Channels(leader)`)
    .eq("userId", userId);

  if (error) throw new Error(error.message);

  return ChannelsParticipants as unknown as T_JoinedChannels;
}

export { getJoinedChannels };
