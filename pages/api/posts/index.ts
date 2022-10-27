import { createHandler, Get, Query } from 'next-api-decorators';
import FakePostsService from '../../../src/common/backend/services/fakePostsService/FakePostsService';

class PostsHandler {
  @Get()
  async getPosts(
    @Query('offset') offset: string,
    @Query('limit') limit: string
  ) {
    const castedOffset = !isNaN(Number(offset)) ? Number(offset) : undefined;
    const castedLimit = !isNaN(Number(limit)) ? Number(limit) : undefined;
    return {
      total: await FakePostsService.getTotalPosts(),
      posts: await FakePostsService.getPosts({
        limit: castedLimit,
        offset: castedOffset
      })
    };
  }
}

export default createHandler(PostsHandler);
