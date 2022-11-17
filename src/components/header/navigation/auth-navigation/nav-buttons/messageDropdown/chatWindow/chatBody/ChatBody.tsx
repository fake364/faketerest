import React from 'react';
import ChatLoading from '../loadingScreen/ChatLoading';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import { groupMessagesArray } from '../utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/types';
import UserDataEntity from '../../../../../../../../common/backend/validation-services/registration/UserDataEntity';
import MessageGroup from './messageGroup/MessageGroup';

type Props = {
  containerRef?: React.LegacyRef<HTMLDivElement>;
  messages: MessagePayload[];
  participantId: number;
  participantName: string;
};

const ChatBody: React.FC<Props> = ({
  containerRef,
  messages,
  participantId,
  participantName
}) => {
  const myId: number = useSelector((state: RootState) => state.metadata.userId);
  const myUser: UserDataEntity = useSelector(
    (state: RootState) => state.userData.userData
  );
  const groupedMessages = messages ? groupMessagesArray(messages) : [];
  const nameMap = {
    [myId]: {
      firstName: myUser.firstName
    },
    [participantId]: {
      firstName: participantName
    }
  };

  return (
    <div className={'flex-1 overflow-y-auto max-h-full'} ref={containerRef}>
      {messages ? (
        <div className={'flex flex-col'}>
          {groupedMessages.map(({ messages: messageGroup, userId }) => {
            const { firstName: groupName } = nameMap[userId];
            const isMyMessage = userId === myId;
            return (
              <MessageGroup
                messages={messageGroup}
                isMyGroup={isMyMessage}
                groupName={groupName}
              />
            );
          })}
        </div>
      ) : (
        <ChatLoading  />
      )}
    </div>
  );
};

export default ChatBody;
