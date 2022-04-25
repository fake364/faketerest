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
  checkUniqueFields,
  matchContentType,
  variableIsEmail
} from '../../../src/common/backend/models/utils/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  requestInfoLogger(req);
  const isPost = RequestMethod.POST === req.method;
  await RegService.checkConnection();
  let regInstance: Registration;
  try {
    regInstance = new Registration(req.body);
    await regInstance.validate();
    await regInstance.save();
  } catch (e) {
    console.log(e);
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
      await Registration.create({
        ...(await checkUniqueFields(req, res)),
        regDate: new Date()
      });
      res.status(StatusCodes.OK).json({ status: 'Created' });
    } catch (e) {
      console.warn(e);
    }
  } else {
    setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST);
  }
};
