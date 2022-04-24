import type { NextApiRequest, NextApiResponse } from 'next';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export const requestInfoLogger = (req: NextApiRequest) => {
  console.info(req.method, req.url);
};

export const setDefaultMessageByCode = (
  res: NextApiResponse,
  code: StatusCodes,
  customMessage?: string
) => {
  res.status(code).json({ error: customMessage || getReasonPhrase(code) });
};
