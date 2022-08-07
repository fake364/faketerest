import { generateJWT } from '../../utils/jwtUtils';
import cookie from 'cookie';
import { AUTH_TOKEN_COOKIE_KEY } from '../../../constants/commons';
import { NextApiResponse } from 'next';

export const setupToken = (res: NextApiResponse, userId: number) => {
  const jwtString = generateJWT(userId);
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(AUTH_TOKEN_COOKIE_KEY, jwtString, {
      httpOnly: true,
      path: '/'
    })
  );
};
