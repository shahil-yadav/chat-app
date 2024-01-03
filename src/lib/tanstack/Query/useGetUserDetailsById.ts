import { useQuery } from '@tanstack/react-query';
import { getUserDetailsById } from '../../supabase/Database/getUserDetailsById';

export function useGetUserDetailsById(uid: string) {
  return useQuery({
    queryKey: ['user', uid],
    queryFn: async () => {
      return await getUserDetailsById(uid);
    },
  });
}
