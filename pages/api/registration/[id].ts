import {
  createHandler,
  Get,
  Query,
  Res
} from '@storyofams/next-api-decorators';
import { WithJWTAuth } from '../../../src/common/backend/utils/middlewares';
import RegistrationService from '../../../src/common/backend/services/RegistrationService';
import Registration from '../../../src/common/backend/models/Registration.model';
import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';

class RegistrationsHandler {
  @Get()
  @WithJWTAuth()
  async registration(@Query('id') id: number, @Res() res: NextApiResponse) {
    console.log('ID', id);
    try {
      await RegistrationService.checkConnection();
      const instance = await Registration.findOne({
        where: { id }
      });
      res.status(StatusCodes.OK).json({
        email: instance.getDataValue('email'),
        firstName: instance.getDataValue('firstName'),
        lastName: instance.getDataValue('lastName'),
        username: instance.getDataValue('username')
      });
    } catch (e) {}
  }
}

export default createHandler(RegistrationsHandler);
