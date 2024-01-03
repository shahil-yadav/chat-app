import { supabase } from "../config";

export interface MessageType {
  payload: string;
  from: string;
  channel: string;
  sentBy: string;
}

export async function postMessages({
  payload,
  from,
  channel,
  sentBy,
}: MessageType) {
  const { data, error } = await supabase
    .from("Messages")
    .insert([{ from, payload, channel, sentBy }])
    .select();
  if (error) throw new Error(error.message);

  return data;
}
