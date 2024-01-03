import { supabase } from "../config";

export async function getMessagesOfChannel(channelName: string | undefined) {
  if (!channelName) throw new Error("Channel name not provided");

  const { data: Messages, error } = await supabase
    .from("Messages")
    .select("*")
    .eq("channel", channelName);
  if (error) throw new Error(error.message);

  return Messages;
}
