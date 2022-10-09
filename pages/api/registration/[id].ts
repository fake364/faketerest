import {
  createHandler,
  Get,
  Header,
  Patch,
  Query,
  Req,
  Res
} from 'next-api-decorators';
import { StatusCodes } from 'http-status-codes';
import { WithJWTAuth } from '../checkToken';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  handlePatchUserByType,
  handleRegistrationError,
  prepareEntityAndValidate,
  updateUser
} from '../../../src/common/backend/utils/registrationUtils/utils';
import RegistrationService from '../../../src/common/backend/services/registrationService/RegistrationService';

export const config = {
  api: {
    bodyParser: false
  }
};

class RegistrationsHandler {
  @Get()
  @WithJWTAuth()
  async registration(
    @Query('id') id: number | string,
    @Res() res: NextApiResponse
  ) {
    try {
      const userData = await RegistrationService.getUserDataBy(id);
      if (!userData) {
        throw new Error('No user found');
      }
      res.status(StatusCodes.OK).json(userData);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e });
    }
  }

  @Patch()
  @WithJWTAuth()
  async changeRegistration(
    @Req() req: NextApiRequest,
    @Query('id') id: number,
    @Header('Content-type') contentType: string,
    @Res() res: NextApiResponse
  ) {
    const result = await handlePatchUserByType(contentType, req, res, id);
    if (!result) {
      return;
    }

    try {
      const dto = await prepareEntityAndValidate(result);
      await updateUser(dto, id, res);
      return;
    } catch (errors) {
      handleRegistrationError(errors, res);
    }
  }
}

export default createHandler(RegistrationsHandler);
