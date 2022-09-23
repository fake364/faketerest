import multer from 'multer';

import {
  Body,
  createHandler,
  Put,
  Query,
  Req,
  Res,
  SetHeader,
  ValidationPipe
} from 'next-api-decorators';
import { WithJWTAuth } from '../../checkToken';
import PutUserPayload from '../../../../src/common/backend/models/validation/patchUser/PutUserPayload';
import RegistrationService from '../../../../src/common/backend/services/RegistrationService';
import Registration from '../../../../src/common/backend/models/Registration.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import formidable from 'formidable';
import * as util from 'util';
import { MB_3_IN_BYTES } from '../../../../src/common/constants/commons';
import path from 'path';
import * as fs from 'fs';

class PersonalDataHandler {
  @Put()
  @SetHeader('Content-Type', 'multipart/form-data')
  @WithJWTAuth()
  async putUserPersonalData(
    @Query('id') id: number,
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: PutUserPayload,
    @Res() res: NextApiResponse
  ) {
    await RegistrationService.checkConnection();
    // TODO PARSE multipart form data
    const form = new formidable.IncomingForm();

    form.maxFileSize = MB_3_IN_BYTES;
    form.uploadDir = path.join('public', 'user', String(id));
    console.log(form);
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }
    const result = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files1) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ values: [fields, files1] });
      });
    });

    console.log(result);

    const [num] = await Registration.update(
      { ...result[0] },
      { where: { id } }
    );
    if (num === 1) {
      res.status(StatusCodes.OK).json({ msg: 'Success updating user' });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error updating user' });
    }
    return result;
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default createHandler(PersonalDataHandler);
