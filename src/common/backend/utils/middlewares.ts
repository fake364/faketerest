import type { NextApiRequest, NextApiResponse } from 'next';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { REGISTRATION_ERROR } from '../models/constants/code';
import { AUTH_TOKEN_COOKIE_KEY } from '../../constants/commons';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import cookie from 'cookie';
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException
} from '@storyofams/next-api-decorators';

export const requestInfoLogger = (req: NextApiRequest) => {
  console.info(req.method, req.url);
};

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

export const WithJWTAuth = createMiddlewareDecorator(
  (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    console.log(req.cookies);
    const token = req.cookies[AUTH_TOKEN_COOKIE_KEY];
    if (token) {
      try {
        jwt.verify(token, process.env.SECRET, {
          algorithms: ['HS256']
        });
        next();
        return;
      } catch (e) {
        console.error(e);
        res.setHeader(
          'Set-Cookie',
          cookie.serialize(AUTH_TOKEN_COOKIE_KEY, '', { httpOnly: true })
        );
      }
    }
    res.status(StatusCodes.UNAUTHORIZED).json({});
  }
);
