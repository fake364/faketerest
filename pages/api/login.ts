import { StatusCodes } from 'http-status-codes';
import Connection from '../../src/common/backend/services/Connection';
import Registration from '../../src/common/backend/models/Registration.model';
import {
  Body,
  createHandler,
  Post,
  Res,
  ValidationPipe
} from 'next-api-decorators';
import type LoginRequestPayload from '../../src/common/backend/models/validation/login/LoginPayload';
import { setupToken } from '../../src/common/backend/models/utils/utils';
import type { NextApiResponse } from 'next';

class LoginHandler {
  @Post()
  async login(
    @Body(ValidationPipe) { password, email }: LoginRequestPayload,
    @Res() res: NextApiResponse
  ) {
    await Connection.checkConnection();
    const instance = await Registration.findOne({
      where: { email: email.toLowerCase() }
    });
    if (instance && instance.getDataValue('password') === password) {
      setupToken(res, instance.getDataValue('id'));
      return {
        message: 'LOGGED_IN',
        userId: Number(instance.getDataValue('id'))
      };
    }
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Could not authenticate' });
  }
}

export default createHandler(LoginHandler);
