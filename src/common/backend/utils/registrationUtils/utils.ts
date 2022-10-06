import { NextApiRequest, NextApiResponse } from 'next';
import { MB_3_IN_BYTES } from '../../../constants/commons';
import * as path from 'path';

import * as fs from 'fs';
import { UserData } from '../../../types/user-types/UserData';
import formidable from 'formidable';
import Registration from '../../models/Registration.model';
import { StatusCodes } from 'http-status-codes';
import UserDataEntity from '../../validation-services/registration/UserDataEntity';

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
  const result: UserDataEntity | undefined = await new Promise((resolve, reject) => {
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
  });
  return result;
};

export const updateUser = async (
  data: object,
  id: number,
  res: NextApiResponse
) => {
  const [updatedCount] = await Registration.update(
    { ...data },
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
