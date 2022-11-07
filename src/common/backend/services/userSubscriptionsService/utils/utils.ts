import { SubscriberDbType } from '../UserSubscriptionsService';

export const mapDbSubscriptionToEntity = (entity: SubscriberDbType) => ({
  id: Number(entity.fk_to_user),
  firstName: entity.FIRST_NAME,
  lastName: entity.LAST_NAME,
  username: entity.USERNAME,
  actionMakerId: Number(entity.fk_from_user)
});

