import { createHandler, Get, Query, Res } from 'next-api-decorators';
import RegistrationService from '../../../src/common/backend/services/RegistrationService';
import { StatusCodes } from 'http-status-codes';
import { WithJWTAuth } from '../checkToken';
import type { NextApiResponse } from 'next';

class RegistrationsHandler {
  @Get()
  @WithJWTAuth()
  async registration(
    @Query('id') id: number | string,
    @Res() res: NextApiResponse
  ) {
    try {
      const userData = await RegistrationService.getUserDataBy(id);
      res.status(StatusCodes.OK).json(userData);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }


}

export default createHandler(RegistrationsHandler);
