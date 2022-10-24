import { ConnectionService } from '../Connection';
import { createPostQuery } from './queries/createPostQuery';
import { selectPostById } from './queries/selectPostById/selectPostById';
import { isPostInstance } from './utils/utils';

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
    console.log(res);
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
}

const FakePostsService = FakePostsServiceClass.getInstance();

export default FakePostsService;
