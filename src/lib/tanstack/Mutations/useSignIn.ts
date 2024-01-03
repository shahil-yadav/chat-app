import { useMutation } from "@tanstack/react-query";
import { AccountType } from "../../supabase/Accounts/AccountType";
import signIn from "../../supabase/Accounts/signIn";
import toast from "react-hot-toast";

export function useSignIn() {
  const mutation = useMutation({
    mutationFn: async ({ email, password }: AccountType) => {
      await signIn({
        email,
        password,
      });
    },
    onSuccess: () => {
      toast.success("Login was successfull");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return mutation;
}
