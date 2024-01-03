import { supabase } from '../config';

export async function getChannels() {
  const { data: Channels, error } = await supabase
    .from('Channels')
    .select('name');

  if (error) throw new Error(error.message);
  return Channels;
}
