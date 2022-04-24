import type { NextApiRequest, NextApiResponse } from 'next';
import {
  requestInfoLogger,
  setDefaultMessageByCode
} from '../../../src/common/backend/utils/middlewares';
import { StatusCodes } from 'http-status-codes';
import RequestMethod from '../../../src/common/constants/requestMethods';
import RegService from '../../../src/common/backend/services/RegistrationService';
import Registration, {
  RegInstanceType
} from '../../../src/common/backend/models/Registration.model';
import { EMAIL_REGEX } from '../../../src/common/constants/commons';
import { Op } from 'sequelize';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  requestInfoLogger(req);

  const isRightContentType =
    req.headers['content-type'].toLocaleLowerCase() === 'application/json';
  const isPost = RequestMethod.POST === req.method;
  const isRegInstance = new Registration(req.body).validate();
  if (
    typeof req.body.email === 'string' &&
    !req.body.email.match(EMAIL_REGEX)
  ) {
    setDefaultMessageByCode(
      res,
      StatusCodes.BAD_REQUEST,
      'Invalid email format'
    );
    return;
  }
  if (isPost && isRightContentType && isRegInstance) {
    await RegService.checkConnection();
    const requestRegJson = req.body as RegInstanceType;
    const reqEmail = requestRegJson.email.toLocaleLowerCase();
    const reqUsername = requestRegJson.username.toLocaleLowerCase();
    const regInstance = await Registration.findOne({
      where: {
        [Op.or]: [{ email: reqEmail }, { username: reqUsername }]
      }
    });
    console.log(
      'kek',
      regInstance.getDataValue('email'),
      ' ',
      regInstance.getDataValue('username')
    );
    await Registration.create({
      username: 'test2',
      age: 12,
      email: 'kek@mail.com',
      passwordHash: '12134',
      regDate: new Date()
    });
    res.status(StatusCodes.OK).json({ status: 'Created' });
    await RegService.closeConnection();
  } else {
    setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST);
  }
};
