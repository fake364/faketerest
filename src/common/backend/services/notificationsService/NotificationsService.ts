import { createClient, RedisClientType } from 'redis';
import EVENT_TYPE from 'faketerest-utilities/dist/events/types';
import MessageUtils from 'faketerest-utilities/dist/events/message/messageUtils';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';

export class NotificationsServiceClass {
  public static instance: NotificationsServiceClass;
  protected client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: 'redis://localhost:6379'
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
      if (list.length > 0) {
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

  async withConnection<T>(callback: () => T) {
    !this.client.isOpen && (await this.client.connect());
    const result = await callback();
    this.client.isOpen && (await this.client.disconnect());
    return result;
  }
}

const NotificationsService = NotificationsServiceClass.getInstance();

export default NotificationsService;
