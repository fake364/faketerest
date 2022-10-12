import { ConnectionService } from '../Connection';
import createSessionQuery from '../countriesService/queries/createSession';
import countValidSessionsById, {
  getValidSessionByUUid
} from '../countriesService/queries/countValidSessionsById';
import deleteSessionById from '../countriesService/queries/deleteSessionById';

export class UserSessionsServiceClass extends ConnectionService {
  public static instance: UserSessionsServiceClass;

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserSessionsServiceClass();
    }
    return this.instance;
  }

  constructor() {
    super();
  }

  deleteSession = async (sessionId: string) => {
    await this.connection.query(deleteSessionById(sessionId));
  };

  createSession = async (userId: number) => {
    const res = await this.connection.query(createSessionQuery(userId));
    const pkId = (res?.[0]?.[0] as { pk_id: string })?.pk_id;
    if (!pkId) throw new Error('Could not create session');
    return pkId;
  };

  isSessionActive = async (uuid: string) => {
    const [[res]] = await this.connection.query(countValidSessionsById(uuid));
    return (res as { count: string })?.count === '1';
  };

  getUserIdBySessionUUid = async (uuid: string) => {
    const [[res]] = await this.connection.query(getValidSessionByUUid(uuid));
    const id = Number((res as { ID: string })?.ID);
    if (isNaN(id)) {
      throw new Error('invalid id');
    }
    return id;
  };
}

const UserSessionsService = UserSessionsServiceClass.getInstance();

export default UserSessionsService;
