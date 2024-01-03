import { useSearchParams } from 'react-router-dom';
import { useGetJoinedChannels } from './lib/tanstack/Query/useGetJoinedChannels';
import { useGetChannelParticipants } from './lib/tanstack/Query/useGetChannelParticipants';

const Chats = ({ onlineUsers }) => {
  const [searchParams] = useSearchParams();
  const channelName = searchParams.get('channel');

  const userJoinedChannels = useGetJoinedChannels();
  const participantsInChannel = useGetChannelParticipants(channelName);

  if (
    userJoinedChannels.data &&
    !userJoinedChannels.data
      .map((channel) => channel.channel)
      .includes(channelName)
  ) {
    return (
      <h1>You aren't authorised to be in this room, join the room first</h1>
    );
  }

  console.log('onlineUsers', onlineUsers);
  return (
    <div>
      <h1>Channel's Participants</h1>
      <ul>
        {participantsInChannel.data &&
          participantsInChannel.data.map((participants, idx) => (
            <li key={idx}>
              <h2>{participants.userId}</h2>
              {onlineUsers?.[participants.userId] ? (
                <p
                  style={{
                    color: 'green',
                  }}
                >
                  Online
                </p>
              ) : (
                <p
                  style={{
                    color: 'red',
                  }}
                >
                  Offline
                </p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Chats;
