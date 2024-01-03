import { supabase } from '../config';
import { AccountType } from './AccountType';

export interface AccountSignUp extends AccountType {
  name: string;
}

async function createAccount({ email, password, name }: AccountSignUp) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  // Create local copy of user in the database
  const { error: userDataError } = await supabase
    .from('Users')
    .insert([
      {
        uid: data.user?.id,
        name: data.user?.user_metadata.name,
        wasOnlineAt: new Date().toLocaleTimeString(),
      },
    ])
    .select();

  if (userDataError)
    throw new Error("User couldn't be added in the local database");

  return data;
}

export { createAccount };
