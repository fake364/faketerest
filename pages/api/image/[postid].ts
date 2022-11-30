import { createHandler, Download, Get, Query } from 'next-api-decorators';
import * as fs from 'fs';
import * as path from 'path';

class PostImageHandler {
  @Get()
  @Download()
  getPostImage(@Query('postid') postid: string) {
    const filename = `${postid}.jpg`;
    return {
      filename,
      contents: fs.createReadStream(
        path.join('static-box', 'posts', `${postid}.jpg`)
      ),
      contentType: 'image/jpg'
    };
  }
}

export default createHandler(PostImageHandler);
