import { createHandler, Header, Post, Req, Res } from 'next-api-decorators';
import { WithSessionAuth } from '../checkSession';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_SESSION_KEY } from '../../../src/common/constants/commons';
import UserSessionsService from '../../../src/common/backend/services/usersSessionsService/UserSessionsService';
import * as path from 'path';
import { StatusCodes } from 'http-status-codes';
import { syncHandleFormAndSaveFile } from '../../../src/common/backend/utils/registrationUtils/utils';
import { uuid } from 'uuidv4';
import FakePostsService from '../../../src/common/backend/services/fakePostsService/FakePostsService';

export const config = {
  api: {
    bodyParser: false
  }
};

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
      const userId = await UserSessionsService.getUserIdBySessionUUid(
        sessionId
      );
      const uploadDir = path.join('public', 'posts');
      const postId = uuid();
      const filename = postId + '.jpg';
      const { description, title } = (await syncHandleFormAndSaveFile(req, {
        uploadDir,
        filename
      })) as { title: string; description: string };

      if (description?.length <= 500 && title?.length <= 100) {
        try {
          await FakePostsService.createPost(postId, title, description, userId);
          return { postId };
        } catch (e) {
          console.error(e);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: 'Error creating post' });
        }
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Looks like you passed not multipart data' });
    }
  }
}

export default createHandler(PostHandler);
