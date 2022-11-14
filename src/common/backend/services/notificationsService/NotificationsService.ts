import { createClient, RedisClientType } from 'redis';

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


  async withConnection<T>(callback: () => T) {
    await this.client.connect();
    const result = callback();
    await this.client.disconnect();
    return result;
  }
}

const NotificationsService = NotificationsServiceClass.getInstance();

export default NotificationsService;
