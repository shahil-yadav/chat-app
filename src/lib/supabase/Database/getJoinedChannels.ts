import { supabase } from '../config';

async function getJoinedChannels(userId: string) {
  const { data: ChannelsParticipants, error } = await supabase
    .from('ChannelsParticipants')
    .select(`channel,Channels(leader)`)
    .eq('userId', userId);

  if (error) throw new Error(error.message);
  return ChannelsParticipants;
}

export { getJoinedChannels };
