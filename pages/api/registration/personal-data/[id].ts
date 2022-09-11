import {
  Body,
  createHandler,
  Put,
  Query,
  Res,
  ValidationPipe
} from 'next-api-decorators';
import { WithJWTAuth } from '../../checkToken';
import PutUserPayload from '../../../../src/common/backend/models/validation/patchUser/PutUserPayload';
import RegistrationService from '../../../../src/common/backend/services/RegistrationService';
import Registration from '../../../../src/common/backend/models/Registration.model';
import type { NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

class PersonalDataHandler {
  @Put()
  @WithJWTAuth()
  async putUserPersonalData(
    @Query('id') id: number,
    @Body(ValidationPipe) body: PutUserPayload,
    @Res() res: NextApiResponse
  ) {
    await RegistrationService.checkConnection();
    const [num] = await Registration.update({ ...body }, { where: { id } });
    if (num === 1) {
      res.status(StatusCodes.OK).json({ msg: 'Success updating user' });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error updating user' });
    }
  }
}

export default createHandler(PersonalDataHandler);
