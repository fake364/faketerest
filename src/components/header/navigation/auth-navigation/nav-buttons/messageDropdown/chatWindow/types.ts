import MessagePayload from 'faketerest-utilities/dist/events/message/type';

export type GroupedMessageById = { userId: number; messages: MessagePayload[] };
