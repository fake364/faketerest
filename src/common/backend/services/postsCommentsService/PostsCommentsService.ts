import { ConnectionService } from '../Connection';
import { insertPostCommentQuery } from './queries/insertPostCommentQuery';
import { selectCommentsByPostIdQuery } from './queries/selectCommentsByPostIdQuery';
import { areCommentEntries } from './utils/utils';

export class PostsCommentsServiceClass extends ConnectionService {
  public static instance: PostsCommentsServiceClass;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostsCommentsServiceClass();
    }
    return this.instance;
  }

  constructor() {
    super();
  }

  createComment = async (text: string, postId: string, userId: number) => {
    const [, res] = await this.connection.query(
      insertPostCommentQuery(text, postId, userId)
    );
    if (res !== 1) {
      throw new Error('Could not create comment');
    }
  };

  getCommentsByPostId = async (postId: string) => {
    const [res] = await this.connection.query(
      selectCommentsByPostIdQuery(postId)
    );
    if (!areCommentEntries(res)) {
      throw new Error('This is not comment entries');
    }
    return res.map((item) => ({
      firstName: item.FIRST_NAME,
      lastName: item.LAST_NAME,
      username: item.USERNAME,
      userId: Number(item.user_id),
      postId: item.fk_post_id,
      text: item.comment_text,
      createDate: item.create_date.toString()
    }));
  };
}

const PostsCommentsService = PostsCommentsServiceClass.getInstance();

export default PostsCommentsService;
