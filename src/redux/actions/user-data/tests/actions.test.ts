import { fetchUserData, setUserLoading } from '../actions';
import axios from 'axios';
import { UserData } from '../../../../common/types/user-types/UserData';
import { jest } from '@jest/globals';

describe('user data actions', () => {
  describe('setUserLoading', () => {
    it('should create proper action object', () => {
      expect(setUserLoading(true)).toStrictEqual({
        payload: true,
        type: 'SET_USER_DATA_LOADING'
      });
    });
  });

  describe('fetchUserData', () => {
    it('should initialize user data asynchronously', async () => {
      jest.spyOn(axios, 'get').mockReturnValue(
        Promise.resolve({
          data: {
            email: 'mail@mail.com',
            firstName: 'First',
            lastName: 'Last',
            username: 'username'
          } as UserData
        })
      );
      const spy = jest.fn();
      await fetchUserData(1)(spy);
      expect(spy).toBeCalledWith({
        payload: {
          email: 'mail@mail.com',
          firstName: 'First',
          lastName: 'Last',
          username: 'username'
        },
        type: 'SET_USER_DATA'
      });
    });
  });
});
