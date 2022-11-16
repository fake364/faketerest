import { createHandler, Get, Query, Req, Res } from 'next-api-decorators';
import { WithSessionAuth } from '../checkSession';
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { AUTH_SESSION_KEY } from '../../../src/common/constants/commons';
import UserSessionsService from '../../../src/common/backend/services/usersSessionsService/UserSessionsService';
import NotificationsService from '../../../src/common/backend/services/notificationsService/NotificationsService';

class MessagesHandler {
  @WithSessionAuth()
  @Get()
  async getConversationMessages(
    @Res() res: NextApiResponse,
    @Query('userId') userId: string,
    @Req() req: NextApiRequest
  ) {
    const userIdNumber = Number(userId);
    if (!isNaN(userIdNumber)) {
      const sessionId = req.cookies[AUTH_SESSION_KEY];
      const requestId = await UserSessionsService.getUserIdBySessionUUid(
        sessionId
      );
      return await NotificationsService.getConversationMessages(
        requestId,
        userIdNumber
      );
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Provided non value user id' });
    }
  }
}

export default createHandler(MessagesHandler);
