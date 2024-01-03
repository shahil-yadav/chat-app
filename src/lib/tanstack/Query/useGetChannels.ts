import { useQuery } from '@tanstack/react-query';
import { getChannels } from '../../supabase/Database/getChannels';

export function useGetChannels() {
  return useQuery({
    queryKey: ['channels'],
    queryFn: async () => {
      return await getChannels();
    },
  });
}
