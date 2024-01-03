import { supabase } from '../config';

export async function signOutFromAccount() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
