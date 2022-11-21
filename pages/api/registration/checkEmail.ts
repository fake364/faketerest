import { createHandler, Get, Query, Res } from 'next-api-decorators';
import RegistrationService from '../../../src/common/backend/services/registrationService/RegistrationService';
import type { NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

class CheckEmailHandler {
  @Get()
  async checkEmail(@Query('email') email: string, @Res() res: NextApiResponse) {
    if (!(await RegistrationService.isEmailExists(email))) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'No such email' });
    }
  }
}

export default createHandler(CheckEmailHandler);
