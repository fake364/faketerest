import {
  Body,
  createHandler,
  Delete,
  Post,
  ValidationPipe
} from 'next-api-decorators';
import SubscriptionPayload from '../../../../src/common/classes/subscriptionPayload/SubscriptionPayload';
import UserSubscriptionsService from '../../../../src/common/backend/services/userSubscriptionsService/UserSubscriptionsService';

class UserSubscriptionHandler {
  @Delete()
  async deleteSubscription(
    @Body(ValidationPipe) { fromUser, toUser }: SubscriptionPayload
  ) {
    await UserSubscriptionsService.removeSubscription(fromUser, toUser);
  }

  @Post()
  async addSubscription(
    @Body(ValidationPipe) { fromUser, toUser }: SubscriptionPayload
  ) {
    await UserSubscriptionsService.addSubscription(fromUser, toUser);
  }
}

export default createHandler(UserSubscriptionHandler);
