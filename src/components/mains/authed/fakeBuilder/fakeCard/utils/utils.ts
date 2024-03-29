import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';
import { FieldChangeValues, PostFieldKeys } from '../../FakeBuilderContainer';
import { isArray, ValidationError } from 'class-validator';

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
    case 'isSelected':
      changedPost[name] = value as boolean;
      break;
    case 'uploadId':
      changedPost[name] = value as string;
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
  formData.set('title', title.trim());
  formData.set('description', description.trim());
  formData.set('image', image);
  return [id, formData];
};
