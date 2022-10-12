import type { NextApiRequest, NextApiResponse } from 'next';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { REGISTRATION_ERROR } from '../models/constants/code';
import { AUTH_SESSION_KEY } from '../../constants/commons';
import { NextFunction, UnauthorizedException } from 'next-api-decorators';
import UserSessionsService from '../services/usersSessionsService/UserSessionsService';

export const setDefaultMessageByCode = (
  res: NextApiResponse,
  code: StatusCodes,
  customMessage?: string,
  options?: { errorCode: typeof REGISTRATION_ERROR }
) => {
  res.status(code).json({
    error: customMessage || getReasonPhrase(code),
    ...(options || {})
  });
};

export const sessionMiddlewareFn = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction
) => {
  const sessionUUid = req.cookies[AUTH_SESSION_KEY];
  try {
    if (await UserSessionsService.isSessionActive(sessionUUid)) {
      next();
      return;
    }
  } catch (e) {
    console.error(e);
  }
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ message: 'Error in jwt middleware' });
  throw new UnauthorizedException();
};
