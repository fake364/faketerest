import React from 'react';
import clsx from 'clsx';
import MessageBubble from '../messageBubble/MessageBubble';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import { RiCheckDoubleFill } from '@react-icons/all-files/ri/RiCheckDoubleFill';
import { RiCheckFill } from '@react-icons/all-files/ri/RiCheckFill';
import CreatedAtLabel from '../../../../../../../../../common/components/createdAtLabel/CreatedAtLabel';

type Props = {
  messages: MessagePayload[];
  isMyGroup: boolean;
  groupName: string;
};

const MessageGroup: React.FC<Props> = ({ isMyGroup, groupName, messages }) => {
  const messageGroupStyle = isMyGroup
    ? 'self-start items-start'
    : 'self-end items-end mr-[8px]';
  const readIconStyle = '!text-[18px]';
  return (
    <div
      className={clsx('flex flex-col gap-[6px] max-w-[70%]', messageGroupStyle)}
    >
      <div className={'flex gap-[4px] items-center'}>
        <div className={'text-[14px] text-[gray]'}>{groupName}</div>
      </div>
      {messages.map(({ text, hasBeenRead, createdAt }) => (
        <MessageBubble isMyMessage={isMyGroup}>
          <div className={'flex gap-[8px]'}>
            {text}
            <div
              className={'flex items-end absolute right-[12px] bottom-[6px]'}
            >
              {isMyGroup &&
                (hasBeenRead ? (
                  <RiCheckDoubleFill className={readIconStyle} />
                ) : (
                  <RiCheckFill className={readIconStyle} />
                ))}
            </div>
          </div>
        </MessageBubble>
      ))}
    </div>
  );
};

export default MessageGroup;
