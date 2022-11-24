import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';
import ChatBody from './chatBody/ChatBody';
import TopBackAndTitlePanel from './chatTopPanel/TopBackAndTitlePanel';
import ChatBottomPanel from './chatBottomPanel/ChatBottomPanel';
import { clearMessageIds } from '../../../../../../../redux/actions/messages/actions';
import useRoomConnection from './hooks/useRoomConnection';

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
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const myId: number = useSelector((state: RootState) => state.metadata.userId);
  const roomRef = useRef<string>();
  const dispatch = useDispatch();

  const { messages } = useRoomConnection(participantId);

  const chatScrollBody = useRef<HTMLDivElement>();

  const onChange = (e) => {
    setText(e.target.value);
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
        <TopBackAndTitlePanel onBack={onBack} title={firstName} />
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
