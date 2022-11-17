import { createHandler, Get, Req } from 'next-api-decorators';
import { WithSessionAuth } from '../../checkSession';
import UserSessionsService from '../../../../src/common/backend/services/usersSessionsService/UserSessionsService';
import type { NextApiRequest } from 'next';
import { AUTH_SESSION_KEY } from '../../../../src/common/constants/commons';
import NotificationsService from '../../../../src/common/backend/services/notificationsService/NotificationsService';

class DialogsHandler {
  @Get()
  @WithSessionAuth()
  async getDialogs(@Req() req: NextApiRequest) {
    const sessionId = req.cookies[AUTH_SESSION_KEY];
    const id = await UserSessionsService.getUserIdBySessionUUid(sessionId);
    const dialogsKeys = await NotificationsService.getUsersDialogs(id);
    return dialogsKeys
      .map((dialogKey) =>
        dialogKey
          .split(':')
          .slice(1)
          .filter((participant) => participant !== String(id))
          .map(Number)
      )
      .flat();
  }
}

export default createHandler(DialogsHandler);
