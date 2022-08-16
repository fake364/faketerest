import { renderHook } from '@testing-library/react-hooks';
import { useFetchUser } from '../useFetchUser';
import { Provider } from 'react-redux';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import * as asyncAction from '../../../../redux/actions/user-data/actions';
import { waitFor } from '@testing-library/dom';

describe('useFetchUser', () => {
  const mockStore = configureMockStore([]);

  it('should trigger and fetch user on logged and having userId', async () => {
    const wrapper = ({ children }) => (
      <Provider
        store={mockStore({
          metadata: { isLoggedIn: true, userId: 4 }
        })}
      >
        {children}
      </Provider>
    );
    const spy = jest
      .spyOn(asyncAction, 'fetchUserData')
      .mockImplementation(() => ({ type: 'sometype' }));
    const {
      result: { current }
    } = await renderHook(() => useFetchUser(), { wrapper });
    await waitFor(() => {
      expect(spy).toBeCalled();
    });
  });
});
