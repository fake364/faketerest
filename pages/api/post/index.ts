import {
  Body,
  createHandler,
  Header,
  Post,
  Req,
  Res,
  ValidationPipe
} from 'next-api-decorators';
import FakePostEntity from '../../../src/common/classes/fakePostEntity/FakePostEntity';
import { WithSessionAuth } from '../checkSession';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_SESSION_KEY } from '../../../src/common/constants/commons';
import UserSessionsService from '../../../src/common/backend/services/usersSessionsService/UserSessionsService';
import * as path from 'path';
import * as fs from 'fs';
import formidable from 'formidable';
import { StatusCodes } from 'http-status-codes';

class PostHandler {
  @Post()
  @WithSessionAuth()
  async createPost(
    @Req() req: NextApiRequest,
    @Header('Content-type') contentType: string,
    @Res() res: NextApiResponse
  ) {
    if (contentType.includes('multipart')) {
      const sessionId = req.cookies[AUTH_SESSION_KEY];
      const userId = UserSessionsService.getUserIdBySessionUUid(sessionId);
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Looks like you passed not multipart data' });
    }
  }
}

export default createHandler(PostHandler);
