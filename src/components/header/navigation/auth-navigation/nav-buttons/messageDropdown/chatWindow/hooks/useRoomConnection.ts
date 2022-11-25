import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/types';
import axios from 'axios';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import MessageUtils from 'faketerest-utilities/dist/events/message/messageUtils';
import { CUSTOM_HEADERS } from 'faketerest-utilities/dist/common/enums';

const useRoomConnection = (participantId: number) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const myId: number = useSelector((state: RootState) => state.metadata.userId);
  const roomRef = useRef<string>();
  const [messages, setMessages] = useState<MessagePayload[]>();

  const setupSocket = () => {
    roomRef.current = MessageUtils.createConversationId(
      Number(participantId),
      Number(myId)
    );
    socketRef.current = io('http://84.46.243.80:3003', {
      extraHeaders: {
        [CUSTOM_HEADERS.X_CLIENT_ID]: String(myId),
        [CUSTOM_HEADERS.X_JOIN_ROOM]: roomRef.current
      }
    });
    const socket = socketRef.current;
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
    if (!socketRef.current) {
      setupSocket();
    }
    if (!socketRef.current?.connected) {
      socketRef.current?.connect();
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    const result = await axios.get('/api/messages', {
      params: { userId: participantId }
    });
    setMessages(result.data);
  };

  return { messages,socketRef };
};

export default useRoomConnection;
