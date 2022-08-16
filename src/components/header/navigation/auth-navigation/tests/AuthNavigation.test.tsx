import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AuthNavigation from '../AuthNavigation';
import RegFormSpinner from '../../../../mains/others/baseMain/regForm/form/spinner/RegFormSpinner';
import { UserData } from '../../../../../common/types/user-types/UserData';

describe('AuthNavigation', () => {
  const mockStore = configureMockStore([]);

  it('should render loading if user data is loading', () => {
    const component = mount(
      <Provider store={mockStore({ userData: { isLoading: true } })}>
        <AuthNavigation />
      </Provider>
    );
    expect(component.find(RegFormSpinner)).toHaveLength(1);
  });

  it('should render loading if user data is null', () => {
    const component = mount(
      <Provider
        store={mockStore({ userData: { isLoading: false, userData: null } })}
      >
        <AuthNavigation />
      </Provider>
    );
    expect(component.find(RegFormSpinner)).toHaveLength(1);
  });

  it('should render auth header with a lot of buttons', () => {
    const component = mount(
      <Provider
        store={mockStore({
          userData: {
            isLoading: false,
            userData: {
              email: 'mail@mail.com',
              firstName: 'First',
              lastName: 'Last',
              username: 'user'
            } as UserData
          }
        })}
      >
        <AuthNavigation />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
