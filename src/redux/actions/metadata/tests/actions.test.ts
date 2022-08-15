import { setIsLoggedIn, setUserId } from '../actions';

describe('metadata actions', () => {
  describe('setIsLoggedIn', () => {
    it('should create proper object', () => {
      expect(setIsLoggedIn(true)).toStrictEqual({
        payload: true,
        type: 'SET_IS_LOGGED_IN'
      });
    });
  });

  describe('setUserId', () => {
    it('should create proper object', () => {
      expect(setUserId(1)).toStrictEqual({
        payload: 1,
        type: 'SET_USER_ID'
      });
    });
  });
});
