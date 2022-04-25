import Registration, { RegInstanceType } from '../Registration.model';
import { NextApiRequest, NextApiResponse } from 'next';
import { trimToLower } from '../../../utils/string/string-utils';
import { Op } from 'sequelize';
import { setDefaultMessageByCode } from '../../utils/middlewares';
import { StatusCodes } from 'http-status-codes';
import { REGISTRATION_ERROR } from '../constants/code';
import { EMAIL_REGEX } from '../../../constants/commons';

export const isRegistrationEntity = (
  regInstance: unknown
): regInstance is RegInstanceType => {
  const isObject = typeof regInstance === 'object';
  if (isObject) {
    const reg = regInstance as RegInstanceType;
    const hasEmail = typeof reg.email === 'string';
    const hasUsername = typeof reg.username === 'string';
    const hasPass = typeof reg.passwordHash === 'string';
    return hasEmail && hasUsername && hasPass;
  }
  return false;
};

export const checkUniqueFields = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Omit<RegInstanceType, 'id' | 'regDate'>> => {
  const requestRegJson = req.body as RegInstanceType;
  const reqEmail = trimToLower(requestRegJson.email);
  const reqUsername = trimToLower(requestRegJson.username);

  const regInstance = await Registration.findOne({
    where: {
      [Op.or]: [{ email: reqEmail }, { username: reqUsername }]
    }
  });

  const dbEmail = trimToLower(regInstance?.getDataValue('email') || '');
  const dbUsername = trimToLower(regInstance?.getDataValue('username') || '');
  const areEmailsSame = dbEmail === reqEmail;
  const areUsernamesSame = dbUsername === reqUsername;
  if (regInstance && (areEmailsSame || areUsernamesSame)) {
    const userTitle = areUsernamesSame && 'Username';
    const emailTitle = areEmailsSame && 'Email';
    setDefaultMessageByCode(
      res,
      StatusCodes.BAD_REQUEST,
      `${userTitle || emailTitle} is already exists`,
      {
        errorCode: areEmailsSame
          ? REGISTRATION_ERROR.EXISTENT_EMAIL
          : REGISTRATION_ERROR.EXISTENT_USERNAME
      }
    );
    throw new Error('Some field is not unique');
  }
  return {
    email: reqEmail,
    username: reqUsername,
    age: requestRegJson.age,
    passwordHash: requestRegJson.passwordHash
  };
};

export const matchContentType = (req: NextApiRequest, contentType: string) =>
  req.headers['content-type'].toLocaleLowerCase() === contentType;

export const variableIsEmail = (email: unknown) =>
  typeof email === 'string' && !email.match(EMAIL_REGEX);
