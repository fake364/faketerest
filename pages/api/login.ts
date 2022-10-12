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
import { createAndAssignSession } from '../../src/common/backend/models/utils/utils';
import type { NextApiResponse } from 'next';
import { createPasswordHmac } from '../../src/common/backend/utils/password/utils';

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
    if (instance) {
      const dbPass = createPasswordHmac(password);
      console.log(dbPass, instance.getDataValue('password'));
      if (dbPass === instance.getDataValue('password')) {
        await createAndAssignSession(res, instance.getDataValue('id'));
        return {
          message: 'LOGGED_IN',
          userId: Number(instance.getDataValue('id'))
        };
      }
    }
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Could not authenticate' });
  }
}

export default createHandler(LoginHandler);
