import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import { GroupedMessageById } from '../types';

export const groupMessagesArray = (messages: MessagePayload[]) => {
  if (messages.length === 0) {
    return [];
  }

  let currentSubMessage: GroupedMessageById = {
    userId: messages[0].authorId,
    messages: [messages[0]]
  };
  if (messages.length === 1) {
    return [currentSubMessage];
  }
  const groupedMessages: GroupedMessageById[] = [];
  for (const message of messages.slice(1)) {
    if (message.authorId !== currentSubMessage.userId) {
      groupedMessages.push(currentSubMessage);
      currentSubMessage = { messages: [message], userId: message.authorId };
    } else {
      currentSubMessage.messages.push(message);
    }
  }
  if (!groupedMessages.includes(currentSubMessage)) {
    groupedMessages.push(currentSubMessage);
  }
  return groupedMessages;
};
