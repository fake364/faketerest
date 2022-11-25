import type { NextApiResponse } from 'next';
import UserSessionsService from '../../services/usersSessionsService/UserSessionsService';
import cookie from 'cookie';
import { AUTH_SESSION_KEY } from '../../../constants/commons';

export const createAndAssignSession = async (
  res: NextApiResponse,
  userId: number
) => {
  const sessionUUid = await UserSessionsService.createSession(userId);
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(AUTH_SESSION_KEY, sessionUUid, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // TWO DAYS
      sameSite: 'strict'
    })
  );
};
