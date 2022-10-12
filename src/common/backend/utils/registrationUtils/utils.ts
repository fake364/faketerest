import { NextApiRequest, NextApiResponse } from 'next';
import { MB_3_IN_BYTES } from '../../../constants/commons';
import * as path from 'path';

import * as fs from 'fs';
import formidable from 'formidable';
import Registration from '../../models/Registration.model';
import { StatusCodes } from 'http-status-codes';
import UserDataEntity from '../../validation-services/registration/UserDataEntity';
import CountriesService from '../../services/countriesService/CountriesService';
import { selectCountryCodeId } from '../../sql/selectCountryCodeId';
import { isArray, validate, ValidationError } from 'class-validator';
import { createPasswordHmac } from '../password/utils';
import { SQL_ERRORS } from '../../sql/constants/constants';

export const handleRegistrationFormData = async (
  req: NextApiRequest,
  userId
) => {
  const form = new formidable.IncomingForm();

  form.maxFileSize = MB_3_IN_BYTES;
  form.uploadDir = path.join('public', 'user', String(userId));

  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir, { recursive: true });
  }
  const result: UserDataEntity | undefined = await new Promise(
    (resolve, reject) => {
      form.parse(req, (err, fields, file) => {
        if (err) {
          reject(err);
          return;
        }
        if (file?.image) {
          fs.rename(
            file.image.filepath,
            form.uploadDir + '/avatar.png',
            () => {}
          );
        }

        resolve(fields);
      });
    }
  );
  return result;
};

export const updateUser = async (
  { countryCode3, country, ...rest }: Partial<UserDataEntity>,
  id: number,
  res: NextApiResponse
) => {
  let countryId = null;
  if (countryCode3) {
    const [[obj]] = await CountriesService.connection.query(
      selectCountryCodeId(countryCode3)
    );
    countryId = (obj as { PK_ID: number }).PK_ID;
  }

  const [updatedCount] = await Registration.update(
    { ...rest, fkCountryCode: countryId },
    { where: { id } }
  );

  if (updatedCount === 1) {
    res.status(StatusCodes.OK).json({ msg: 'Success updating user' });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error updating user' });
  }
};

export const handlePatchUserByType = async (
  contentType: string,
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) => {
  if (contentType.includes('multipart')) {
    try {
      return await handleRegistrationFormData(req, id);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Bad incoming data type' });
  }
  return null;
};

const modifyFieldFn =
  (action: (key, value) => void) =>
  ([key, value]: [string, string]) => {
    let finalValue;
    switch (key) {
      case 'gender':
        finalValue = Number(value);
        break;
      case 'password':
        finalValue = createPasswordHmac(value);
        break;
      default:
        finalValue = value;
        break;
    }
    action(key, finalValue);
    return;
  };

const receivedValidCurrentPassword = async (
  currentPassword: string,
  userId: number
) => {
  const instance = await Registration.findOne({ where: { id: userId } });
  return new Promise((resolve) =>
    resolve(
      createPasswordHmac(currentPassword) === instance?.getDataValue('password')
    )
  );
};

const CURRENT_PASSWORD_INVALID = {
  constraints: { currentPasswordError: 'Current password is not valid' }
};

export const prepareEntityAndValidate = async (
  payload: UserDataEntity,
  id: number
): Promise<UserDataEntity> => {
  const dto = new UserDataEntity();
  const formValues = Object.entries(payload);
  if (formValues.length > 0) {
    formValues.forEach(modifyFieldFn((key, value) => (dto[key] = value)));
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true
    });
    const hasCurrentPasswordNoError =
      errors.length === 0 && dto.currentPassword;
    if (
      hasCurrentPasswordNoError &&
      !(await receivedValidCurrentPassword(dto.currentPassword, id))
    ) {
      errors.push(CURRENT_PASSWORD_INVALID as any);
    }
    return new Promise((resolve, reject) => {
      errors.length === 0 ? resolve(dto) : reject(errors);
    });
  }
};

export const areValidationErrors = (
  errors: unknown
): errors is ValidationError[] => {
  return isArray(errors);
};

export const handleRegistrationError = (
  errors:
    | ValidationError[]
    | { original: { constraint: string; code: string } },
  res: NextApiResponse
) => {
  res.status(StatusCodes.BAD_REQUEST);
  if (areValidationErrors(errors)) {
    res.json({ errors: errors.map((err) => err.constraints) });
  } else {
    const code = errors?.original?.code;
    const constraint = errors?.original?.constraint;
    if (code && constraint) {
      res.json({
        errors: [
          {
            status: code,
            field: constraint
          }
        ]
      });
    }
  }
};

const crypto = require('crypto');

export function hashStringWithLength(data: string, len: number) {
  return crypto
    .createHash('shake256', { outputLength: len })
    .update(data)
    .digest('hex');
}
