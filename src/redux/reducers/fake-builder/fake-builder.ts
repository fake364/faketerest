import { AnyAction } from 'redux';
import { WIPE_STATE } from '../../actions/metadata/actions';
import FakePostEntity from '../../../common/classes/fakePostEntity/FakePostEntity';
import {
  CHANGE_POST_VALUE_BY_ID,
  RESET_FAKE_POSTS,
  SET_FAKE_POSTS,
  setFakePosts
} from '../../actions/fake-builder/actions';
import { changePostByName } from '../../../components/mains/authed/fakeBuilder/fakeCard/utils/utils';
import { getUpdatedPosts } from './utils/utils';

type FakeBuilderState = {
  posts: FakePostEntity[];
};

const initialState: FakeBuilderState = {
  posts: [new FakePostEntity(0)]
};

export default function fakeBuilderReducer(
  state = initialState,
  { type, payload }: AnyAction
) {
  switch (type) {
    case SET_FAKE_POSTS:
      return { ...state, posts: payload };
    case RESET_FAKE_POSTS:
    case WIPE_STATE:
      return initialState;
    case CHANGE_POST_VALUE_BY_ID:
      return {
        ...state,
        posts: getUpdatedPosts(
          state.posts,
          payload.id,
          payload.name,
          payload.value
        )
      };
    default:
      return state;
  }
}
