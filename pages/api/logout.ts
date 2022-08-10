import {
  createHandler,
  Get,
  HttpCode,
  Res
} from '@storyofams/next-api-decorators';
import { StatusCodes } from 'http-status-codes';
import { setupToken } from '../../src/common/backend/models/utils/utils';
import { NextApiResponse } from 'next';

class LogoutHandler {
  @HttpCode(StatusCodes.NO_CONTENT)
  @Get()
  async login(@Res() res: NextApiResponse) {
    setupToken(res);
  }
}
export default createHandler(LogoutHandler);
