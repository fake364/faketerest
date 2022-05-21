import type { NextApiRequest, NextApiResponse } from 'next';
import {
  requestInfoLogger,
  setDefaultMessageByCode
} from '../../../src/common/backend/utils/middlewares';
import { StatusCodes } from 'http-status-codes';
import RequestMethod from '../../../src/common/constants/requestMethods';
import RegService from '../../../src/common/backend/services/RegistrationService';
import Registration from '../../../src/common/backend/models/Registration.model';
import {
  matchContentType,
  variableIsEmail
} from '../../../src/common/backend/models/utils/utils';
import { REGISTRATION_ERROR } from '../../../src/common/backend/models/constants/code';
import { generateJWT } from '../../../src/common/backend/utils/jwtUtils';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  requestInfoLogger(req);
  const isPost = RequestMethod.POST === req.method;
  await RegService.checkConnection();
  let regInstance: Registration;
  try {
    regInstance = new Registration(req.body);
    await regInstance.validate();
  } catch (e) {
    console.error(e);
    setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST);
    return;
  }
  if (variableIsEmail(req.body.email)) {
    setDefaultMessageByCode(
      res,
      StatusCodes.BAD_REQUEST,
      'Invalid email format'
    );
    return;
  }
  if (isPost && matchContentType(req, 'application/json')) {
    try {
      await regInstance.save();
      const jwtString = generateJWT(
          regInstance.getDataValue('email'),
          regInstance.getDataValue('regDate').toString()
      );
      res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth-token', jwtString, { httpOnly: true })
      );
      res.status(StatusCodes.OK).json({ status: 'Created' });
    } catch (e) {
      const constraintViolated = e?.original?.constraint;
      if (constraintViolated) {
        const errorMessage = `${constraintViolated} field should be unique. Given ${regInstance.getDataValue(
          constraintViolated
        )} instead`;
        setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST, errorMessage, {
          errorCode: REGISTRATION_ERROR[constraintViolated]
        });
      }
    }
  } else {
    setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST);
  }
};
