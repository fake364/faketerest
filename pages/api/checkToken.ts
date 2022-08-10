import { NextApiRequest, NextApiResponse } from 'next';
import { WithJWTAuth } from '../../src/common/backend/utils/middlewares';
import { createHandler, Get, Req, Res } from '@storyofams/next-api-decorators';
import { AUTH_TOKEN_COOKIE_KEY } from '../../src/common/constants/commons';
import jwt from 'jsonwebtoken';
import RegistrationService from '../../src/common/backend/services/RegistrationService';
import Registration from '../../src/common/backend/models/Registration.model';
import { StatusCodes } from 'http-status-codes';
import { setupToken } from '../../src/common/backend/models/utils/utils';

class CheckTokenHandler {
  @Get()
  @WithJWTAuth()
  async checkToken(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    const payload = jwt.decode(req.cookies[AUTH_TOKEN_COOKIE_KEY]) as {
      userId: number;
    };
    await RegistrationService.checkConnection();
    if (await Registration.findOne({ where: { id: payload.userId } })) {
      return { userId: payload.userId };
    }
    setupToken(res);
    res.status(StatusCodes.UNAUTHORIZED).json({});
  }
}

export default createHandler(CheckTokenHandler);
