import { NextApiRequest, NextApiResponse } from 'next';
import { WithJWTAuth } from '../../../src/common/backend/utils/middlewares';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  WithJWTAuth(req, res);
};
