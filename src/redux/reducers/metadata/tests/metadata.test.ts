import metadataReducer from '../metadata';
import {
  SET_IS_LOGGED_IN,
  SET_USER_ID,
  WIPE_STATE
} from '../../../actions/metadata/actions';

describe('metadata reducer', () => {
  it('should change actual state of isLoggedIn to true', () => {
    expect(
      metadataReducer(
        { isLoggedIn: false },
        { type: SET_IS_LOGGED_IN, payload: true }
      )
    ).toStrictEqual({
      isLoggedIn: true
    });
  });

  it('should set user id to defined value', () => {
    expect(
      metadataReducer({ isLoggedIn: false }, { type: SET_USER_ID, payload: 1 })
    ).toStrictEqual({
      isLoggedIn: false,
      userId: 1
    });
  });

  it('should wipe state to default on specific action', () => {
    expect(
      metadataReducer({ isLoggedIn: true, userId: 1 }, { type: WIPE_STATE })
    ).toStrictEqual({
      isLoggedIn: false
    });
  });

  it('should return current state on not matched action', () => {
    expect(
      metadataReducer({ isLoggedIn: true, userId: 1 }, { type: 'SOME_ACTION' })
    ).toStrictEqual({ isLoggedIn: true, userId: 1 });
  });
});
