import FakePostEntity from '../../../common/classes/fakePostEntity/FakePostEntity';
import {
  FieldChangeValues,
  PostFieldKeys
} from '../../../components/mains/authed/fakeBuilder/FakeBuilderContainer';
import { Dispatch } from 'redux';
import { RootState } from '../../types';
import {
  convertPostToFormData,
  mapIdToPostEntries
} from '../../../components/mains/authed/fakeBuilder/fakeCard/utils/utils';
import { validate } from 'class-validator';
import axios from 'axios';

export const SET_FAKE_POSTS = 'SET_FAKE_POSTS';
export const RESET_FAKE_POSTS = 'RESET_FAKE_POSTS';
export const CHANGE_POST_VALUE_BY_ID = 'CHANGE_POST_VALUE_BY_ID';

export const setFakePosts = (posts: FakePostEntity[]) => ({
  type: SET_FAKE_POSTS,
  payload: posts
});

export const resetPosts = () => ({ type: RESET_FAKE_POSTS });

export const changePostFieldById = (
  id: FakePostEntity['id'],
  name: PostFieldKeys,
  value: FieldChangeValues
) => ({ type: CHANGE_POST_VALUE_BY_ID, payload: { id, name, value } });

export const submitPostsById =
  (ids: FakePostEntity['id'][]) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      fakePosts: { posts }
    } = getState();
    ids.forEach((id) => dispatch(changePostFieldById(id, 'isSelected', false)));
    const postsToCreate = mapIdToPostEntries(ids, posts);
    const validPosts: FakePostEntity[] = [];
    for (const post of postsToCreate) {
      const result = await validate(post);
      if (result.length === 0) {
        validPosts.push(post);
      }
      dispatch(changePostFieldById(post.id, 'errors', result));
    }
    if (validPosts.length > 0) {
      await submitValidForms(validPosts, dispatch);
    }
  };

export const submitValidForms = async (
  posts: FakePostEntity[],
  dispatch: Dispatch
) => {
  for (const [id, formData] of posts.map(convertPostToFormData)) {
    dispatch(changePostFieldById(id, 'isLoading', true));
    axios('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    }).then((res) => {
      dispatch(changePostFieldById(id, 'isLoading', false));
      dispatch(changePostFieldById(id, 'uploadId', res?.data?.postId));
    });
  }
};
