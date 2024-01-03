import { useEffect } from 'react';
import { supabase } from '../lib/supabase/config';
import { useAccountContext } from '../context/AccountProvider';
import CreateChannel from '../components/root/CreateChannel';
import JoinChannel from '../components/root/JoinChannel';
import ChannelCard from '../components/root/ChannelCard';
import { useGetJoinedChannels } from '../lib/tanstack/Query/useGetJoinedChannels';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useGetUserDetailsById } from '../lib/tanstack/Query/useGetUserDetailsById';
import ChannelsParticipants from '../components/root/ChannelsParticipants';

const Chats = () => {
  const { userId } = useAccountContext();
  const { channelName } = useParams();
  const channelsJoined = useGetJoinedChannels();
  const userName = useGetUserDetailsById(userId);
  useEffect(() => {
    if (!userId) {
      return;
    }

    // Handling the joining and leaving of the users
    const channel = supabase.channel('channel', {
      config: {
        presence: {
          key: userId,
        },
      },
    });
    channel
      .on('presence', { event: 'sync' }, () => {
        const online = channel.presenceState();
        console.log(online);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ isOnline: true });
        }
      });

    return () => {
      // TODO : To add this line into build code after removing the React.StrictMode
      // supabase.removeAllChannels();
    };
  }, [userId]);
  return (
    <main className="hidden h-screen bg-black px-8 py-5 md:flex">
      <div className="flex w-80">
        <div className="flex w-20 flex-col items-center gap-6 rounded-bl-3xl rounded-tl-3xl bg-white/15 pt-5">
          <div className="h-[10%]">
            <Button
              as={Link}
              to="/chats"
              className="h-16 w-16"
            >
              /chat
            </Button>
          </div>

          <div className="w-1/2 border"></div>

          <div className="flex grow flex-col gap-3">
            <div className="h-16 w-16 bg-white rounded-full flex justify-center items-center">
              <CreateChannel />
            </div>
            <div className="h-16 bg-white w-16 rounded-full flex items-center justify-center">
              <JoinChannel />
            </div>
          </div>
        </div>

        <div className="flex grow flex-col items-center gap-6 bg-white/20 pt-5">
          <div className="flex h-[10%] items-center">
            <h1 className="text-5xl font-semibold text-white">
              {userName.data?.[0].name}
            </h1>
          </div>

          <div className="w-3/4 border"></div>

          <div className="flex w-full grow flex-col gap-3">
            {channelsJoined.isSuccess &&
              channelsJoined.data?.map((channel, idx) => {
                return (
                  <ChannelCard
                    key={idx}
                    channelName={channel.channel}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex grow flex-col items-center gap-6 pt-5">
        <div className="h-[10%] w-3/4 items-center flex justify-between">
          <p className="text-3xl text-white">{channelName}</p>
          <ChannelsParticipants />
        </div>

        <div className="w-3/4 border"></div>

        {/* Messages */}
        <Outlet />
      </div>
    </main>
  );
};

export default Chats;

/*  
SignOut button
  <Button
    color="primary"
    onPress={signOutFromAccount}
  >
    Sign out
  </Button>;
*/
