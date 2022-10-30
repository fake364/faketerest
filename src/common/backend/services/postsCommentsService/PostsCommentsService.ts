import { ConnectionService } from '../Connection';
import { insertPostCommentQuery } from './queries/insertPostCommentQuery';
import { selectCommentsByPostIdQuery } from './queries/selectCommentsByPostIdQuery';
import { areCommentEntries } from './utils/utils';
import clearExpiredSessions from './queries/clearExpiredSessions';

export class PostsCommentsServiceClass extends ConnectionService {
  public static instance: PostsCommentsServiceClass;
  recycleTimer: NodeJS.Timer;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostsCommentsServiceClass();
    }
    return this.instance;
  }

  constructor() {
    super();
    this.startRecycling();
  }

  startRecycling = () => {
    if (!this.recycleTimer) {
      this.recycleTimer = setInterval(async () => {
        try {
          await this.connection.query(clearExpiredSessions());
        } catch (e) {
          console.error('Error removing sessions', e);
          this.stopRecycler();
        }
      }, 1000 * 60 * 60 * 12); // 12 hours
    }
  };

  stopRecycler = () => {
    clearInterval(this.recycleTimer);
  };

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
