import { NextApiRequest, NextApiResponse } from 'next';
import RequestMethod from '../../src/common/constants/requestMethods';
import { StatusCodes } from 'http-status-codes';
import { validateToken } from '../../src/common/backend/utils/middlewares';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === RequestMethod.GET) {
    try {
      await validateToken(req, res);
    } catch (e) {
      return;
    }
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};
