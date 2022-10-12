import { StatusCodes } from 'http-status-codes';
import Connection from '../../../src/common/backend/services/Connection';
import Registration from '../../../src/common/backend/models/Registration.model';
import {
  Body,
  createHandler,
  Post,
  Res,
  ValidationPipe
} from 'next-api-decorators';
import RegistrationCreatePayload from '../../../src/common/backend/models/validation/registration/RegistrationCreatePayload';
import { createAndAssignSession } from '../../../src/common/backend/models/utils/utils';
import type { NextApiResponse } from 'next';
import { createPasswordHmac } from '../../../src/common/backend/utils/password/utils';
import { hashStringWithLength } from '../../../src/common/backend/utils/registrationUtils/utils';
import { createRegistrationErrorHandler } from '../../../src/common/backend/utils/registrationUtils/errorHandlers';

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
        username: `${firstName}-v${hashStringWithLength(
          String(Date.now()),
          5
        )}`,
        password: createPasswordHmac(body.password)
      });
      await regInstance.save();
      const id = regInstance.getDataValue('id');
      await createAndAssignSession(res, id);
      res.status(StatusCodes.OK).json({ status: 'Created', userId: id });
    } catch (e) {
      createRegistrationErrorHandler(e, res);
    }
  }
}

export default createHandler(CreateRegistrationHandler);
