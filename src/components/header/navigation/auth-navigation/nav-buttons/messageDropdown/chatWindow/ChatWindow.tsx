import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import MessageUtils from 'faketerest-utilities/dist/events/message/messageUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';
import { CUSTOM_HEADERS } from 'faketerest-utilities/dist/common/enums';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import ChatBody from './chatBody/ChatBody';
import ChatTopPanel from './chatTopPanel/ChatTopPanel';
import ChatBottomPanel from './chatBottomPanel/ChatBottomPanel';
import { clearMessageIds } from '../../../../../../../redux/actions/messages/actions';

type Props = {
  firstName: string;
  className?: string;
  onBack: () => void;
  participantId: number;
};

const ChatWindow: React.FC<Props> = ({
  firstName,
  className,
  onBack,
  participantId
}) => {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<MessagePayload[]>();
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const myId: number = useSelector((state: RootState) => state.metadata.userId);
  const roomRef = useRef<string>();
  const dispatch = useDispatch();

  const chatScrollBody = useRef<HTMLDivElement>();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const fetchMessages = async () => {
    const result = await axios.get('/api/messages', {
      params: { userId: participantId }
    });
    setMessages(result.data);
  };

  const submitMessage = async () => {
    if (text.trim()) {
      socketRef.current.emit('message', roomRef.current, text);
      setText('');
      const audio = new Audio('/audio/message_sent.mp3');

      audio.play();
    }
  };

  useEffect(() => {
    dispatch(clearMessageIds(participantId));
  }, []);

  useEffect(() => {
    if (messages) {
      const keysToRead = messages
        .filter(
          ({ hasBeenRead, authorId }) => !hasBeenRead && authorId !== myId
        )
        .map(({ messageId }) => messageId);
      if (keysToRead.length > 0) {
        socketRef.current.emit('read-messages', roomRef.current, keysToRead);
      }
    }
  }, [messages]);

  useEffect(() => {
    chatScrollBody.current?.scrollTo({
      behavior: 'smooth',
      top: chatScrollBody.current.scrollHeight
    });
  }, [messages?.length]);

  const setupSocket = () => {
    roomRef.current = MessageUtils.createConversationId(
      Number(participantId),
      Number(myId)
    );
    socketRef.current = io('http://localhost:3003', {
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

  const submitMessageViaEnter: KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === 'Enter') {
      await submitMessage();
    }
  };

  return (
    <div className={className}>
      <div className={'flex flex-col w-full h-full items-stretch gap-[12px]'}>
        <ChatTopPanel onBack={onBack} title={firstName} />
        <ChatBody
          messages={messages}
          participantId={participantId}
          participantName={firstName}
          containerRef={chatScrollBody}
        />
        <ChatBottomPanel
          onChange={onChange}
          value={text}
          onSubmit={submitMessage}
          onPressKey={submitMessageViaEnter}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
