import { supabase } from '../config';
import { AccountType } from './AccountType';

const signIn = async ({ email, password }: AccountType) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export default signIn;
