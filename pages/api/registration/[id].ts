import {
  createHandler,
  Get,
  Header,
  Patch,
  Query,
  Req,
  Res
} from 'next-api-decorators';
import RegistrationService from '../../../src/common/backend/services/RegistrationService';
import { StatusCodes } from 'http-status-codes';
import { WithJWTAuth } from '../checkToken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validate } from 'class-validator';
import {
  handlePatchUserByType,
  updateUser
} from '../../../src/common/backend/utils/registrationUtils/utils';
import UserDataEntity from '../../../src/common/backend/validation-services/registration/UserDataEntity';

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
      res.status(StatusCodes.OK).json(userData);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
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

    const dto = new UserDataEntity();
    const formValues = Object.entries(result);
    if (formValues.length > 0) {
      formValues.forEach(([key, value]) => (dto[key] = value));
      const errors = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true
      });

      if (errors.length === 0) {
        await updateUser(dto, id, res);
        return;
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: errors.map((err) => err.constraints) });
      }
    } else {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: 'No fields were updated' });
    }
  }
}

export default createHandler(RegistrationsHandler);
