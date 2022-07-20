import { NextApiRequest, NextApiResponse } from 'next';
import { validateToken } from '../../../src/common/backend/utils/middlewares';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  validateToken(req, res);
};
