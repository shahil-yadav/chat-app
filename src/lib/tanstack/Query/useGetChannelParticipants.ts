import { useQuery } from '@tanstack/react-query';
import { getChannelParticipants } from '../../supabase/Database/getChannelParticipants';
import { useParams } from 'react-router-dom';

export function useGetChannelParticipants() {
  const { channelName } = useParams();
  return useQuery({
    queryKey: ['channels_participants', channelName],
    queryFn: async () => {
      if (!channelName) return [];
      return await getChannelParticipants(channelName);
    },
  });
}
