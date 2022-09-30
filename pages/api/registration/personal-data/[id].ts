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
import PublicProfileServiceInstance from '../../../../src/common/backend/services/publicProfile/PublicProfileService';

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

    const result = await PublicProfileServiceInstance.handleFormData(req, id);

    const [updatedCount] = await Registration.update(
      { ...result },
      { where: { id } }
    );

    if (updatedCount === 1) {
      res.status(StatusCodes.OK).json({ msg: 'Success updating user' });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error updating user' });
    }
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default createHandler(PersonalDataHandler);
