import { NextApiRequest } from 'next';
import { WithJWTAuth } from '../../src/common/backend/utils/middlewares';
import { createHandler, Get, Req } from '@storyofams/next-api-decorators';
import { AUTH_TOKEN_COOKIE_KEY } from '../../src/common/constants/commons';
import jwt from 'jsonwebtoken';

class CheckTokenHandler {
  @Get()
  @WithJWTAuth()
  checkToken(@Req() req: NextApiRequest) {
    const payload = jwt.decode(req.cookies[AUTH_TOKEN_COOKIE_KEY]) as {
      userId: number;
    };
    return { userId: payload.userId };
  }
}

export default createHandler(CheckTokenHandler);
