import { NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import RegService from '../../src/common/backend/services/RegistrationService';
import Registration from '../../src/common/backend/models/Registration.model';
import {
  Body,
  createHandler,
  Post,
  Res,
  ValidationPipe
} from '@storyofams/next-api-decorators';
import LoginRequestPayload from '../../src/common/backend/models/validation/login/LoginPayload';
import { setupToken } from '../../src/common/backend/models/utils/utils';

class LoginHandler {
  @Post()
  async login(
    @Body(ValidationPipe) { password, email }: LoginRequestPayload,
    @Res() res: NextApiResponse
  ) {
    await RegService.checkConnection();
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
