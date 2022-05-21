import { NextApiRequest, NextApiResponse } from 'next';
import {
  requestInfoLogger,
  setDefaultMessageByCode
} from '../../src/common/backend/utils/middlewares';
import RequestMethod from '../../src/common/constants/requestMethods';
import { StatusCodes } from 'http-status-codes';
import { isLoginRequestBody } from '../../src/common/utils/typeGuards/loginRequestBody';
import RegService from '../../src/common/backend/services/RegistrationService';
import { variableIsEmail } from '../../src/common/backend/models/utils/utils';
import Registration from '../../src/common/backend/models/Registration.model';
import { generateJWT } from '../../src/common/backend/utils/jwtUtils';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  requestInfoLogger(req);
  const isPost = RequestMethod.POST === req.method;
  if (!isPost) {
    setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST);
    return;
  }
  if (isLoginRequestBody(req.body)) {
    if (variableIsEmail(req.body.email)) {
      setDefaultMessageByCode(
        res,
        StatusCodes.BAD_REQUEST,
        'You specified not valid email'
      );
      return;
    }
    await RegService.checkConnection();
    const instance = await Registration.findOne({
      where: { email: req.body.email.toLowerCase() }
    });
    if (instance && instance.getDataValue('password') === req.body.password) {
      const jwtString = generateJWT(
        instance.getDataValue('email'),
        instance.getDataValue('regDate').toString()
      );
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth-token', jwtString, { httpOnly: true })
      );
      res.status(StatusCodes.OK).json({ message: 'LOGGED_IN' });
      return;
    }
  }
  setDefaultMessageByCode(res, StatusCodes.UNAUTHORIZED);
};
