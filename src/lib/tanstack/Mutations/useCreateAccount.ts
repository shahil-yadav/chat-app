import { useMutation } from "@tanstack/react-query";
import {
  AccountSignUp,
  createAccount,
} from "../../supabase/Accounts/createAccount";
import toast from "react-hot-toast";

export function useCreateAccount() {
  const mutation = useMutation({
    mutationFn: async ({ email, password, name }: AccountSignUp) => {
      await createAccount({
        email,
        password,
        name,
      });
    },

    onSuccess: () => {
      toast.success(`Welcome to your chat application`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return mutation;
}
