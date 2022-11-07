import { ConnectionService } from '../Connection';
import insertSubscription from './queries/insertSubscription';
import removeSubscription from './queries/removeSubscription';
import selectUserSubscribersQuery from './queries/selectUserSubscribersQuery';
import { Nullable } from '../../../types/common';
import selectUserSubscriptionsQuery from './queries/selectUserSubscriptionsQuery';
import { mapDbSubscriptionToEntity } from './utils/utils';

export type SubscriberDbType = {
  fk_to_user: number;
  FIRST_NAME: string;
  LAST_NAME: Nullable<string>;
  USERNAME: string;
  fk_from_user: number;
};

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

  async getUserSubscribers(userId: number) {
    const [res] = await this.connection.query(
      selectUserSubscribersQuery(userId)
    );
    const checkedEntries = res as SubscriberDbType[];

    return checkedEntries.map(mapDbSubscriptionToEntity);
  }

  async getUserSubscriptions(userId: number) {
    const [res] = await this.connection.query(
      selectUserSubscriptionsQuery(userId)
    );
    const checkedEntries = res as SubscriberDbType[];

    return checkedEntries.map(mapDbSubscriptionToEntity);
  }
}

const UserSubscriptionsService = UserSubscriptionsServiceClass.getInstance();

export default UserSubscriptionsService;
