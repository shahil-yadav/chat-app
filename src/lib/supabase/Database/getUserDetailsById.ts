import { supabase } from '../config';

export async function getUserDetailsById(userId: string) {
  const { data: Users, error } = await supabase
    .from('Users')
    .select('*')
    .eq('uid', userId);

  if (error) throw new Error(error.message);
  return Users;
}
