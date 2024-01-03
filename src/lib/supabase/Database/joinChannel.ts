import { supabase } from "../config";
import { getJoinedChannels } from "./getJoinedChannels";

export async function joinChannel({
  channelName,
  userId,
}: {
  channelName: string;
  userId: string;
}) {
  // Check if you are already joined in the channel
  const alreadyJoinedChannels = await getJoinedChannels(userId);
  if (
    alreadyJoinedChannels.find((channel) => channel.channel === channelName)
  ) {
    throw new Error("Already Joined the Channel");
  }

  // If not, join it !
  const { data, error } = await supabase
    .from("ChannelsParticipants")
    .insert([{ channel: channelName, userId }])
    .select();
  if (error) throw new Error(error.message);

  return data;
}
