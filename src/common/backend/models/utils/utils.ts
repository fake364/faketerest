import type { NextApiResponse } from 'next';
import UserSessionsService from '../../services/usersSessionsService/UserSessionsService';
import cookie from 'cookie';
import { AUTH_SESSION_KEY } from '../../../constants/commons';

export const createAndAssignSession = async (res: NextApiResponse, userId: number) => {
  const sessionUUid = await UserSessionsService.createSession(userId);
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(AUTH_SESSION_KEY, sessionUUid, {
      httpOnly: true,
      path: '/'
    })
  );
};
