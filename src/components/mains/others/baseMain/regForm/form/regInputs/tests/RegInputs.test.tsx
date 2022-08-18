import React from 'react';
import * as formik from 'formik';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { RegInputs } from '../RegInputs';
import { expect, jest } from '@jest/globals';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import * as actions from '../../../../../../../../redux/actions/metadata/actions';

jest.mock('axios');

describe('RegInputs', () => {
  const mockStore = configureMockStore([]);

  const initSubmitFunction = (callback: (arg: Function) => void) => {
    let oldFormik = formik.useFormik;
    jest.spyOn(formik, 'useFormik').mockImplementation((props) => {
      callback(props.onSubmit);
      return oldFormik(props);
    });
  };

  it('should set isLoginedIn and user id on successful registration', async () => {
    let submitFn;
    initSubmitFunction((submit) => (submitFn = submit));
    mount(
      <Provider store={mockStore({ metadata: {} })}>
        <RegInputs />
      </Provider>
    );
    expect(submitFn).toBeDefined();
    axios.mockImplementation(() =>
      Promise.resolve({ status: StatusCodes.OK, data: { userId: 14 } })
    );
    const isLogginedSpy = jest.spyOn(actions, 'setIsLoggedIn');
    const setUserIdSpy = jest.spyOn(actions, 'setUserId');
    await submitFn({ password: 'test', age: 14, email: 'mail@mail.com' });
    expect(isLogginedSpy).toBeCalled();
    expect(setUserIdSpy).toBeCalledWith(14);
  });
});
