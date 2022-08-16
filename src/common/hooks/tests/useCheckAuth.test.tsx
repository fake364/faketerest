import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import * as actions from '../../../redux/actions/metadata/actions';
import { renderHook } from '@testing-library/react-hooks';
import { useCheckAuth } from '../useCheckAuth';
import React from 'react';
import { waitFor } from '@testing-library/dom';

describe('useCheckAuth', () => {
  const mockStore = configureMockStore([]);

  it('should call check token and set logged state', async () => {
    const wrapper = ({ children }) => (
      <Provider store={mockStore({ metadata: {} })}>{children}</Provider>
    );
    const spy = jest.spyOn(axios, 'get').mockReturnValue(
      Promise.resolve({
        data: {
          userId: 12
        },
        status: StatusCodes.OK
      })
    );
    const loggedActionSpy = jest.spyOn(actions, 'setIsLoggedIn');
    const userIdSpy = jest.spyOn(actions, 'setUserId');

    const {
      result: { current }
    } = await renderHook(() => useCheckAuth(), { wrapper });
    expect(spy).toBeCalled();
    expect(loggedActionSpy).toBeCalledWith(true);
    expect(userIdSpy).toBeCalledWith(12);
  });

  it('should call and change just loading state', async () => {
    const wrapper = ({ children }) => (
      <Provider store={mockStore({ metadata: {} })}>{children}</Provider>
    );
    const spy = jest.spyOn(axios, 'get').mockReturnValue(Promise.reject());
    const hook = await renderHook(() => useCheckAuth(), { wrapper });
    await waitFor(() => {
      expect(hook.result.current.isCheckingAuth).toBeFalsy();
    });
  });
});
