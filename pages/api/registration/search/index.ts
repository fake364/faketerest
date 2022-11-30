import { createHandler, Get, Query, Req } from 'next-api-decorators';
import RegistrationService from '../../../../src/common/backend/services/registrationService/RegistrationService';
import { WithSessionAuth } from '../../checkSession';
import UserSessionsService from '../../../../src/common/backend/services/usersSessionsService/UserSessionsService';
import type { NextApiRequest } from 'next';
import { AUTH_SESSION_KEY } from '../../../../src/common/constants/commons';

class SearchHandler {
  @Get()
  @WithSessionAuth()
  async searchUsers(@Query('text') text: string, @Req() req: NextApiRequest) {
    if (text) {
      const myId = await UserSessionsService.getUserIdBySessionUUid(
        req.cookies[AUTH_SESSION_KEY]
      );
      return await RegistrationService.getUsersByStringEntry(text, myId);
    }
    return [];
  }
}

export default createHandler(SearchHandler);
