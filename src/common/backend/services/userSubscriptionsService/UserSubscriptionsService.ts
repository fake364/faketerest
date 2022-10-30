import { ConnectionService } from '../Connection';
import insertSubscription from './queries/insertSubscription';
import removeSubscription from './queries/removeSubscription';
import selectUserSubscriptionsQuery from './queries/selectUserSubscriptionsQuery';

export class UserSubscriptionsServiceClass extends ConnectionService {
  public static instance: UserSubscriptionsServiceClass;

  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserSubscriptionsServiceClass();
    }
    return this.instance;
  }

  async addSubscription(fromUserId: number, toUserId: number) {
    await this.connection.query(insertSubscription(fromUserId, toUserId));
  }

  async removeSubscription(fromUserId: number, toUserId: number) {
    await this.connection.query(removeSubscription(fromUserId, toUserId));
  }

  async getUserSubscriptions(userId: number) {
    const [res] = await this.connection.query(
      selectUserSubscriptionsQuery(userId)
    );
    const checkedEntries = res as any[]; // TODO Check type

    return checkedEntries.map((entity) => ({
      id: Number(entity.fk_to_user),
      firstName: entity.FIRST_NAME,
      lastName: entity.LAST_NAME,
      username: entity.USERNAME
    }));
  }
}

const UserSubscriptionsService = UserSubscriptionsServiceClass.getInstance();

export default UserSubscriptionsService;
