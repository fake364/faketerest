import type { NextApiResponse } from 'next';
import { setDefaultMessageByCode } from '../../../src/common/backend/utils/middlewares';
import { StatusCodes } from 'http-status-codes';
import RegService from '../../../src/common/backend/services/RegistrationService';
import Registration from '../../../src/common/backend/models/Registration.model';
import { REGISTRATION_ERROR } from '../../../src/common/backend/models/constants/code';
import { generateJWT } from '../../../src/common/backend/utils/jwtUtils';
import cookie from 'cookie';
import { AUTH_TOKEN_COOKIE_KEY } from '../../../src/common/constants/commons';
import {
  Body,
  createHandler,
  Post,
  Res,
  ValidationPipe
} from '@storyofams/next-api-decorators';
import RegistrationCreatePayload from '../../../src/common/backend/models/validation/registration/RegistrationCreatePayload';
import { setupToken } from '../../../src/common/backend/models/utils/utils';

class CreateRegistrationHandler {
  @Post()
  async create(
    @Body(ValidationPipe) body: RegistrationCreatePayload,
    @Res() res: NextApiResponse
  ) {
    let regInstance;
    try {
      await RegService.checkConnection();
      const firstName = body.email.split('@')[0].toLowerCase();
      const formattedFirstName =
        firstName[0].toUpperCase() + firstName.slice(1, firstName.length);
      regInstance = new Registration({
        ...body,
        firstName: formattedFirstName,
        username: firstName
      });
      await regInstance.save();
      const id = regInstance.getDataValue('id');
      setupToken(res, id);
      res.status(StatusCodes.OK).json({ status: 'Created', userId: id });
    } catch (e) {
      const constraintViolated = e?.original?.constraint;
      if (constraintViolated) {
        const errorMessage = `${constraintViolated} field should be unique. Given ${regInstance.getDataValue(
          constraintViolated
        )} instead`;
        setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST, errorMessage, {
          errorCode: REGISTRATION_ERROR[constraintViolated]
        });
      } else res.status(StatusCodes.BAD_REQUEST).json({ error: e });
    }
  }
}

export default createHandler(CreateRegistrationHandler);
