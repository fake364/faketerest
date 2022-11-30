import { io, Socket } from 'socket.io-client';
import { MutableRefObject, useEffect, useState } from 'react';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/types';
import axios from 'axios';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import MessageUtils from 'faketerest-utilities/dist/events/message/messageUtils';
import { CUSTOM_HEADERS } from 'faketerest-utilities/dist/common/enums';

const useRoomConnection = (
  participantId: number,
  ref: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>,
  roomRef: React.MutableRefObject<string>
) => {
  const myId: number = useSelector((state: RootState) => state.metadata.userId);
  const [messages, setMessages] = useState<MessagePayload[]>();

  const setupSocket = () => {
    roomRef.current = MessageUtils.createConversationId(
      Number(participantId),
      Number(myId)
    );
    ref.current = io({
      path: '/pager-connect',
      hostname: process.env.PAGER_API_URL,
      extraHeaders: {
        [CUSTOM_HEADERS.X_CLIENT_ID]: String(myId),
        [CUSTOM_HEADERS.X_JOIN_ROOM]: roomRef.current
      }
    });
    const socket = ref.current;
    socket.connect();

    socket.on('message', (payload: MessagePayload) => {
      setMessages((prev) => [...prev, payload]);
    });

    socket.on('read-messages', (keysToChange: string[]) => {
      setMessages((prev) =>
        prev.map((message) => {
          if (keysToChange.includes(message.messageId)) {
            return { ...message, hasBeenRead: true };
          }
          return message;
        })
      );
    });
  };

  useEffect(() => {
    fetchMessages();
    if (!ref.current) {
      setupSocket();
    }
    if (!ref.current?.connected) {
      ref.current?.connect();
    }

    return () => {
      ref.current?.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    const result = await axios.get('/api/messages', {
      params: { userId: participantId }
    });
    setMessages(result.data);
  };

  return { messages};
};

export default useRoomConnection;
