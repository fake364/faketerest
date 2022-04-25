import type { NextApiRequest, NextApiResponse } from 'next';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { REGISTRATION_ERROR } from '../models/constants/code';

export const requestInfoLogger = (req: NextApiRequest) => {
  console.info(req.method, req.url);
};

export const setDefaultMessageByCode = (
  res: NextApiResponse,
  code: StatusCodes,
  customMessage?: string,
  options?: { errorCode: REGISTRATION_ERROR }
) => {
  res
    .status(code)
    .json({
      error: customMessage || getReasonPhrase(code),
      ...(options || {})
    });
};
