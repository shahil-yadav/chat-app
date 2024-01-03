import { useQuery } from '@tanstack/react-query';
import { getJoinedChannels } from '../../supabase/Database/getJoinedChannels';
import { useAccountContext } from '../../../context/AccountProvider';

function useGetJoinedChannels() {
  const { userId } = useAccountContext();
  return useQuery({
    queryKey: ['joined_channels', userId],
    queryFn: async () => {
      return await getJoinedChannels(userId);
    },
  });
}

export { useGetJoinedChannels };
