import { createClient, RedisClientType } from 'redis';
import EVENT_TYPE from 'faketerest-utilities/dist/events/types';
import MessageUtils from 'faketerest-utilities/dist/events/message/messageUtils';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';

export class NotificationsServiceClass {
  public static instance: NotificationsServiceClass;
  protected client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://redis:${process.env.REDIS_DB_PORT}`,
      password: process.env.REDIS_DB_PASS
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new NotificationsServiceClass();
    }
    return this.instance;
  }

  getConversationMessages = (mainUser: number, participantId: number) => {
    return this.withConnection(async () => {
      const listKey = MessageUtils.createConversationId(
        mainUser,
        participantId
      );
      const list = await this.client.hVals(listKey);
      if (list?.length > 0) {
        const parsedMessages = list.map((item) =>
          JSON.parse(item)
        ) as MessagePayload[];
        return parsedMessages.sort(
          ({ createdAt: a }, { createdAt: b }) =>
            new Date(a).getTime() - new Date(b).getTime()
        );
      }
      return [];
    });
  };

  // TODO wrap with try catch to prevent error crash
  async withConnection<T>(callback: () => T) {
    !this.client.isOpen && (await this.client.connect());
    const result = await callback();
    return result;
  }

  getUsersDialogs(userId: number) {
    return this.withConnection(async () => {
      const usersDialogs =
        (await this.client.keys(`${EVENT_TYPE.MESSAGE}:*${userId}*`)) || [];
      const splittedDialogKeys = usersDialogs.map((dialogKey) =>
        dialogKey.split(':')
      );
      const filteredDialogs = splittedDialogKeys.filter((splitedKey) =>
        splitedKey.slice(1).some((id) => id === String(userId))
      );
      return filteredDialogs.map((dialogsParts) => dialogsParts.join(':'));
    });
  }

  getUnreadMessagesFromRoom = async (roomKey: string, myId: number) => {
    !this.client.isOpen && (await this.client.connect());
    const messages = (await this.client.hVals(roomKey)).flat();
    if (messages.length === 0) {
      return [];
    }
    return messages
      .map((str) => JSON.parse(str) as MessagePayload)
      .filter(({ authorId, hasBeenRead }) => myId !== authorId && !hasBeenRead);
  };
}

const NotificationsService = NotificationsServiceClass.getInstance();

export default NotificationsService;
