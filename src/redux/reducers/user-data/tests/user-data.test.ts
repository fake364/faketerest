import userDataReducer from '../user-data';
import {
  SET_USER_DATA,
  SET_USER_DATA_LOADING
} from '../../../actions/user-data/actions';
import { UserData } from '../../../../common/types/user-types/UserData';
import { WIPE_STATE } from '../../../actions/metadata/actions';
import metadataReducer from '../../metadata/metadata';

describe('user data reducer', () => {
  it('should set user data loading', () => {
    expect(
      userDataReducer(
        { isLoading: true },
        { type: SET_USER_DATA_LOADING, payload: false }
      )
    ).toStrictEqual({
      isLoading: false
    });
  });

  it('should set user data', () => {
    expect(
      userDataReducer(
        { isLoading: false },
        {
          type: SET_USER_DATA,
          payload: {
            lastName: 'Last',
            firstName: 'First',
            email: 'email@mail.com',
            username: 'username'
          } as UserData
        }
      )
    ).toStrictEqual({
      isLoading: false,
      userData: {
        email: 'email@mail.com',
        firstName: 'First',
        lastName: 'Last',
        username: 'username'
      }
    });
  });

  it('should wipe data on specific action', () => {
    expect(
      userDataReducer(
        {
          isLoading: true,
          userData: {
            lastName: 'Last',
            firstName: 'First',
            email: 'email@mail.com',
            username: 'username'
          }
        },
        { type: WIPE_STATE }
      )
    ).toStrictEqual({
      isLoading: false
    });
  });

  it('should return current state on not matched action', () => {
    expect(
      userDataReducer(
        {
          isLoading: true,
          userData: {
            lastName: 'Last',
            firstName: 'First',
            email: 'email@mail.com',
            username: 'username'
          }
        },
        { type: 'SOME_ACTION' }
      )
    ).toStrictEqual({
      isLoading: true,
      userData: {
        lastName: 'Last',
        firstName: 'First',
        email: 'email@mail.com',
        username: 'username'
      }
    });
  });
});
