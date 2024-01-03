import { useEffect, useState } from 'react';
import './App.css';
import { useCreateAccount } from './lib/tanstack/Mutations/useCreateAccount';

import { signOutFromAccount } from './lib/supabase/Accounts/signOut';
import { supabase } from './lib/supabase/config';
import { useSignIn } from './lib/tanstack/Mutations/useSignIn';
import { useAccountContext } from './context/AccountProvider';
import { useCreateChannel } from './lib/tanstack/Mutations/useCreateChannel';
import { useGetChannels } from './lib/tanstack/Query/useGetChannels';
import { useJoinChannel } from './lib/tanstack/Mutations/useJoinChannel';
import { useGetJoinedChannels } from './lib/tanstack/Query/useGetJoinedChannels';
import {
  Route,
  Routes,
  createSearchParams,
  useNavigate,
} from 'react-router-dom';
import Chats from './pages/Chats';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [channelName, setChannelName] = useState('');
  const [channelToJoin, setChannelToJoin] = useState('');

  const { isSignedIn, userId } = useAccountContext();
  const accountCreate = useCreateAccount();
  const channelCreate = useCreateChannel();
  const channelJoin = useJoinChannel();
  const accountSignIn = useSignIn();

  const availaibleChannels = useGetChannels();
  const joinedChannels = useGetJoinedChannels();
  const navigate = useNavigate();

  const [onlineUsers, setOnlineUsers] = useState({});
  useEffect(() => {
    if (!userId) return;
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
        console.log('sync', online);
        setOnlineUsers(() => ({
          ...online,
        }));
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ isOnline: new Date().toLocaleTimeString() });
        }
      });

    return () => {
      supabase.removeAllChannels();
    };
  }, [userId, setOnlineUsers]);

  if (!isSignedIn) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <input
          type="text"
          placeholder="email"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="password"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            if (!email || !password) return;
            accountSignIn.mutate({
              email,
              password,
            });
          }}
        >
          {accountSignIn.isPending ? 'Loading' : 'Login Account'}
        </button>

        <button
          onClick={async () => {
            const {
              data: { user },
            } = await supabase.auth.getUser();
            console.log(user);
          }}
        >
          Retrieve User
        </button>
      </div>
    );
  }

  if (joinedChannels.isPending) {
    return <h1>Fetching Joined Channels</h1>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <p>Welcome brother! {userId}</p>
            <div>
              <h2>My Channels</h2>
              <ul>
                <li>
                  {joinedChannels.data
                    ?.filter((channel) => channel.Channels.leader === userId)
                    .map((channel, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const urlSearchParams = createSearchParams({
                            channel: channel.channel,
                          });
                          navigate(`/chat?${urlSearchParams.toString()}`);
                        }}
                      >
                        {channel.channel}
                      </button>
                    ))}
                </li>
              </ul>

              <h2>Other Channels I join</h2>
              <ul>
                <li>
                  {joinedChannels.data
                    ?.filter((channel) => channel.Channels.leader !== userId)
                    .map((channel, idx) => (
                      <li key={idx}>{channel.channel}</li>
                    ))}
                </li>
              </ul>
            </div>

            {/* Create Channel */}
            <div>
              <h2>Create Channels</h2>
              <input
                type="text"
                placeholder="Channel Name"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setChannelName(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  channelCreate.mutate({
                    channelName,
                    channelLeader: userId,
                  });
                }}
              >
                {channelCreate.isPending ? 'Loading' : 'Create Channel'}
              </button>
            </div>

            {/* Join Channel */}
            <div>
              <h2>Join Channel</h2>
              {!availaibleChannels.isLoading ? (
                <input
                  type="text"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChannelToJoin(e.target.value)
                  }
                />
              ) : (
                <h1>Loading</h1>
              )}

              <button
                onClick={() => {
                  if (!channelToJoin) return;
                  channelJoin.mutate({
                    channelName: channelToJoin,
                    userId,
                  });
                }}
              >
                {channelJoin.isPending ? 'Joining In' : 'Join Channel'}
              </button>
            </div>

            <button
              onClick={() => {
                signOutFromAccount();
              }}
            >
              SignOut
            </button>
          </div>
        }
      />
      <Route
        path="/chat"
        element={<Chats onlineUsers={onlineUsers} />}
      />
    </Routes>
  );
}

export default App;
