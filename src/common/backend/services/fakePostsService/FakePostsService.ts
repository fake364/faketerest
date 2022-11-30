import { ConnectionService } from '../Connection';
import { createPostQuery } from './queries/createPostQuery';
import { selectPostById } from './queries/selectPostById/selectPostById';
import { isPostInstance } from './utils/utils';
import selectAllPostsQuery, {
  SelectPostsSettings
} from './queries/selectAllPosts/selectAllPostsQuery';
import path from 'path';
import totalPostsQuery from './queries/totalPostsQuery/totalPostsQuery';
const sizeOf = require('image-size');

type TablePostEntity = { title?: string; description?: string; pk_id: string };

export class FakePostsServiceClass extends ConnectionService {
  public static instance: FakePostsServiceClass;

  static getInstance() {
    if (!this.instance) {
      this.instance = new FakePostsServiceClass();
    }
    return this.instance;
  }

  constructor() {
    super();
  }

  createPost = async (
    pkPostId: string,
    title: string,
    description: string,
    fkUserId: number
  ) => {
    const titleToSave = title.trim() || null;
    const descriptionToSave = description.trim() || null;
    const res = await this.connection.query(
      createPostQuery(pkPostId, titleToSave, descriptionToSave, fkUserId)
    );
    if (res[1] !== 1) {
      throw new Error('Number of affected rows is not 1');
    }
  };

  getPost = async (postId: string) => {
    const [[res]] = await this.connection.query(selectPostById(postId));
    if (!isPostInstance(res)) {
      throw new Error('Wrong payload', res);
    }
    return {
      title: res.title,
      description: res.description,
      author: {
        id: Number(res.fk_user_id),
        firstName: res.FIRST_NAME,
        lastName: res.LAST_NAME,
        username: res.USERNAME
      }
    };
  };

  getPosts = async (settings: SelectPostsSettings) => {
    const [res] = await this.connection.query(selectAllPostsQuery(settings));
    const posts = res as TablePostEntity[];
    return posts.map(({ pk_id, title, description }) => {
      const dimensions = sizeOf(path.join('static-box', 'posts', `${pk_id}.jpg`));
      return {
        postId: pk_id,
        title,
        description,
        sizes: [dimensions.width, dimensions.height]
      };
    });
  };

  getTotalPosts = async (fromUserId?: number) => {
    const [[res]] = await this.connection.query(totalPostsQuery(fromUserId));
    const countObj = res as { count: string };
    return Number(countObj.count);
  };
}

const FakePostsService = FakePostsServiceClass.getInstance();

export default FakePostsService;
