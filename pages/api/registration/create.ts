import { setDefaultMessageByCode } from '../../../src/common/backend/utils/middlewares';
import { StatusCodes } from 'http-status-codes';
import Connection from '../../../src/common/backend/services/Connection';
import Registration from '../../../src/common/backend/models/Registration.model';
import { REGISTRATION_ERROR } from '../../../src/common/backend/models/constants/code';
import {
  Body,
  createHandler,
  Post,
  Res,
  ValidationPipe
} from 'next-api-decorators';
import RegistrationCreatePayload from '../../../src/common/backend/models/validation/registration/RegistrationCreatePayload';
import { setupToken } from '../../../src/common/backend/models/utils/utils';
import type { NextApiResponse } from 'next';

class CreateRegistrationHandler {
  @Post()
  async create(
    @Body(ValidationPipe) body: RegistrationCreatePayload,
    @Res() res: NextApiResponse
  ) {
    let regInstance;
    try {
      await Connection.checkConnection();
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
