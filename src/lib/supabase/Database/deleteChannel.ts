import { supabase } from "../config";

async function deleteChannel(channelName: string) {
  const { error } = await supabase
    .from("Channels")
    .delete()
    .eq("name", channelName);

  if (error) throw new Error(error.message);
}

export { deleteChannel };
