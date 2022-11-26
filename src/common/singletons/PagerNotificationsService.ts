import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { CUSTOM_HEADERS } from 'faketerest-utilities/dist/common/enums';

export class PagerNotificationsServiceClass {
  public static instance: PagerNotificationsServiceClass;
  private _socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new PagerNotificationsServiceClass();
    }
    return this.instance;
  }

  setupListeners = async (userId: number) => {
    if (this._socket) {
      await this._socket.disconnect();
    }
    this._socket = io(process.env.PAGER_API_URL, {
      extraHeaders: { [CUSTOM_HEADERS.X_CLIENT_ID]: String(userId) }
    }) as unknown as Socket<DefaultEventsMap, DefaultEventsMap>;
    await this._socket.connect();
  };

  get socket(): Socket<DefaultEventsMap, DefaultEventsMap> {
    return this._socket;
  }
}

const PagerNotificationsService = PagerNotificationsServiceClass.getInstance();

export default PagerNotificationsService;
