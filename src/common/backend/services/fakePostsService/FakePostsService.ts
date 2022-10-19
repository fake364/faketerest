import { ConnectionService } from '../Connection';
import { createPostQuery } from './queries/createPostQuery';

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
}

const FakePostsService = FakePostsServiceClass.getInstance();

export default FakePostsService;
