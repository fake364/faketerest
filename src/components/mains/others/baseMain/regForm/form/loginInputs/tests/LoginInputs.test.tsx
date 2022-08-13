import React from 'react';
import * as axios from 'axios';

import { mount } from 'enzyme';
import LoginInputs from '../LoginInputs';
import * as formik from 'formik';
import { RootState } from '../../../../../../../../redux/types';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { waitFor } from '@testing-library/dom';
import { StatusCodes } from 'http-status-codes';
import * as metadataActions from '../../../../../../../../redux/actions/metadata/actions';

jest.mock('axios');
jest.mock('next/router', () => ({
  pathname: '/another',
  push: jest.fn(() => Promise.resolve())
}));

describe('LoginInputs', () => {
  const mockStore = configureMockStore([]);
  const state: RootState = {
    metadata: { isLoggedIn: false },
    userData: null
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mountInputs = () => {
    return mount(
      <Provider store={mockStore(state)}>
        <header style={{ visibility: 'hidden' }} />
        <LoginInputs />
      </Provider>
    );
  };

  const initSubmitFunction = (callback: (arg: Function) => void) => {
    let oldFormik = formik.useFormik;
    jest.spyOn(formik, 'useFormik').mockImplementation((props) => {
      callback(props.onSubmit);
      return oldFormik(props);
    });
  };

  it('should call request to login path', async () => {
    let onSubmitFn;
    initSubmitFunction((arg) => {
      onSubmitFn = arg;
    });
    const isLoggedSpy = jest.spyOn(metadataActions, 'setIsLoggedIn');
    const userIdSpy = jest.spyOn(metadataActions, 'setUserId');
    axios.mockImplementation(() =>
      Promise.resolve({ data: {}, status: StatusCodes.OK })
    );
    const component = mountInputs();
    await waitFor(() => {
      expect(onSubmitFn).toBeDefined();
    });
    await onSubmitFn({ password: 'test', email: 'mail@mail.com' });
    expect(axios).toBeCalledWith('/api/login', {
      data: {
        email: 'mail@mail.com',
        password:
          '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
      },
      method: 'POST',
      responseType: 'json'
    });
    expect(isLoggedSpy).toHaveBeenCalled();
    expect(userIdSpy).toHaveBeenCalled();
    expect(component.find('header').props().style.visibility).toBe('hidden');
  });

  it('should set unauthorized error if we get 401', async () => {
    let onSubmitFn;
    initSubmitFunction((arg) => {
      onSubmitFn = arg;
    });
    axios.mockImplementation(() =>
      Promise.reject({
        data: {},
        response: { status: StatusCodes.UNAUTHORIZED }
      })
    );
    const component = mountInputs();
    await waitFor(() => {
      expect(onSubmitFn).toBeDefined();
    });
    await onSubmitFn({ password: 'test', email: 'mail@mail.com' });
    component.update();
    expect(component.find('#error-label').text()).toBe('invalidAuth');
  });
});
