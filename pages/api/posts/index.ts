import { createHandler, Get, Query } from 'next-api-decorators';
import FakePostsService from '../../../src/common/backend/services/fakePostsService/FakePostsService';

class PostsHandler {
  @Get()
  async getPosts(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Query('userId') userId: string
  ) {
    const castedOffset = !isNaN(Number(offset)) ? Number(offset) : undefined;
    const castedLimit = !isNaN(Number(limit)) ? Number(limit) : undefined;
    const castedUserId = !isNaN(Number(userId)) ? Number(userId) : undefined;
    return {
      total: await FakePostsService.getTotalPosts(castedUserId),
      posts: await FakePostsService.getPosts({
        limit: castedLimit,
        offset: castedOffset,
        userId: castedUserId
      })
    };
  }
}

export default createHandler(PostsHandler);
