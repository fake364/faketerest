import { createHandler, Get, HttpCode, Req } from 'next-api-decorators';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest } from 'next';
import UserSessionsService from '../../src/common/backend/services/usersSessionsService/UserSessionsService';
import { AUTH_SESSION_KEY } from '../../src/common/constants/commons';

class LogoutHandler {
  @HttpCode(StatusCodes.NO_CONTENT)
  @Get()
  async logout(@Req() req: NextApiRequest) {
    const sessionId = req.cookies[AUTH_SESSION_KEY];
    if (sessionId) {
      await UserSessionsService.deleteSession(sessionId);
    }
  }
}
export default createHandler(LogoutHandler);
