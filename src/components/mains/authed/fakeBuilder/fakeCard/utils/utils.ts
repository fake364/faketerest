import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';
import { FieldChangeValues, PostFieldKeys } from '../../FakeBuilderContainer';
import { isArray, ValidationError } from 'class-validator';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';

export const changePostByName = (
  fakePost: FakePostEntity,
  name: PostFieldKeys,
  value: FieldChangeValues
) => {
  const changedPost = fakePost.clone();
  switch (name) {
    case 'title':
    case 'description':
      if (typeof value === 'string') {
        changedPost[name] = value as string;
      }
      break;
    case 'id':
      if (typeof value === 'number') {
        changedPost[name] = value as number;
      }
      break;
    case 'image':
      changedPost[name] = value as File;
      changedPost.errors = changedPost.errors.filter(
        ({ property }) => property !== 'image'
      );
      break;
    case 'errors':
      if (isArray(value)) {
        changedPost[name] = value as ValidationError[];
      }
      break;
    case 'isLoading':
      changedPost[name] = value as boolean;
      break;
  }

  return changedPost;
};

export const mapIdToPostEntries = (ids: number[], posts: FakePostEntity[]) =>
  ids
    .map((id) => posts.find(({ id: postId }) => id === postId))
    .filter(Boolean);

export const convertPostToFormData = ({
  id,
  title,
  image,
  description
}: FakePostEntity): [number, FormData] => {
  const formData = new FormData();
  formData.set('title', title);
  formData.set('description', description);
  formData.set('image', image);
  return [id, formData];
};
