import { supabase } from '../config';
import { joinChannel } from './joinChannel';

export interface Channel {
  channelName: string;
  channelLeader: string;
}

async function createChannel({ channelName, channelLeader }: Channel) {
  const { data, error } = await supabase
    .from('Channels')
    .insert([{ name: channelName, leader: channelLeader }])
    .select();
  if (error) throw new Error(error.message);

  await joinChannel({ channelName, userId: channelLeader });

  return data;
}

export { createChannel };
