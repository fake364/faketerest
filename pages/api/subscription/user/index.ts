import {
  Body,
  createHandler,
  Delete,
  Get,
  Post,
  Query,
  Res,
  ValidationPipe
} from 'next-api-decorators';
import SubscriptionPayload from '../../../../src/common/classes/subscriptionPayload/SubscriptionPayload';
import UserSubscriptionsService from '../../../../src/common/backend/services/userSubscriptionsService/UserSubscriptionsService';
import type { NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

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

  @Get()
  async getSubscriptions(
    @Query('userId') id: string,
    @Res() res: NextApiResponse
  ) {
    const parsedId = Number(id);
    if (!isNaN(parsedId)) {
      return (
        await UserSubscriptionsService.getUserSubscriptions(parsedId)
      ).map(({ id }) => id);
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'User id is not valid' });
    }
  }
}

export default createHandler(UserSubscriptionHandler);
