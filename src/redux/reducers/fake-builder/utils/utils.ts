import FakePostEntity from '../../../../common/classes/fakePostEntity/FakePostEntity';
import {
  FieldChangeValues,
  PostFieldKeys
} from '../../../../components/mains/authed/fakeBuilder/FakeBuilderContainer';
import { changePostByName } from '../../../../components/mains/authed/fakeBuilder/fakeCard/utils/utils';

export const getUpdatedPosts = (
  posts: FakePostEntity[],
  id: FakePostEntity['id'],
  name: PostFieldKeys,
  value: FieldChangeValues
) => {
  const index = posts.findIndex(({ id: postId }) => postId === id);
  if (index !== -1) {
    const newPosts = [...posts];
    newPosts[index] = changePostByName(posts[index], name, value);
    return newPosts;
  }
  return posts;
};
