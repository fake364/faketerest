import {
  Body,
  createHandler,
  Post,
  Res,
  ValidationPipe
} from 'next-api-decorators';
import CommentEntity from '../../../../src/common/classes/commentEntity/CommentEntity';
import { WithSessionAuth } from '../../checkSession';
import PostsCommentsService from '../../../../src/common/backend/services/postsCommentsService/PostsCommentsService';
import type { NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

class CommentsHandler {
  @WithSessionAuth()
  @Post()
  async createComment(
    @Body(ValidationPipe) { text, userId, postId }: CommentEntity,
    @Res() res: NextApiResponse
  ) {
    try {
      await PostsCommentsService.createComment(text, postId, userId);
      return;
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
  }
}

export default createHandler(CommentsHandler);
