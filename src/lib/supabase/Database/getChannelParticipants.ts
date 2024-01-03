import { supabase } from '../config';

export async function getChannelParticipants(channelName: string) {
  const { data: ChannelsParticipants, error } = await supabase
    .from('ChannelsParticipants')
    .select(`userId,Users(name)`)
    .eq('channel', channelName);

  if (error) throw new Error(error.message);
  return ChannelsParticipants;
}
