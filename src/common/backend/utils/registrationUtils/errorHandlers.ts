import { setDefaultMessageByCode } from '../middlewares';
import { StatusCodes } from 'http-status-codes';
import { REGISTRATION_ERROR } from '../../models/constants/code';
import { NextApiResponse } from 'next';

export const createRegistrationErrorHandler = (e, res: NextApiResponse) => {
  console.log(e);
  const constraintViolated = e?.original?.constraint;
  if (constraintViolated) {
    const errorMessage = `${constraintViolated} field should be unique.`;
    setDefaultMessageByCode(res, StatusCodes.BAD_REQUEST, errorMessage, {
      errorCode: REGISTRATION_ERROR[constraintViolated]
    });
  } else res.status(StatusCodes.BAD_REQUEST).json({ error: e });
};
