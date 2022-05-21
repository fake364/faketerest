import { NextApiRequest } from 'next';
import { EMAIL_REGEX } from '../../../constants/commons';

export const matchContentType = (req: NextApiRequest, contentType: string) =>
  req.headers['content-type'].toLocaleLowerCase() === contentType;

export const variableIsEmail = (email: unknown) =>
  typeof email === 'string' && !email.match(EMAIL_REGEX);
