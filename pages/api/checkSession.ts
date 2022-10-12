import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createHandler,
  createMiddlewareDecorator,
  Get,
  Req,
  Res
} from 'next-api-decorators';
import { AUTH_SESSION_KEY } from '../../src/common/constants/commons';
import RegistrationService from '../../src/common/backend/services/Connection';
import { StatusCodes } from 'http-status-codes';
import { sessionMiddlewareFn } from '../../src/common/backend/utils/middlewares';
import UserSessionsService from '../../src/common/backend/services/usersSessionsService/UserSessionsService';

export const WithSessionAuth = createMiddlewareDecorator(sessionMiddlewareFn);

class CheckSessionHandler {
  @Get()
  async checkSession(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    await RegistrationService.checkConnection();

    try {
      return {
        userId: await UserSessionsService.getUserIdBySessionUUid(
          req.cookies[AUTH_SESSION_KEY]
        )
      };
    } catch (e) {
      console.error(
        'Could not authenticate for ' + req.cookies[AUTH_SESSION_KEY]
      );
    }
    res.status(StatusCodes.UNAUTHORIZED).json({});
  }
}

export default createHandler(CheckSessionHandler);
