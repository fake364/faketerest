import React from 'react';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';
import { UserData } from '../../../../../../../../common/types/user-types/UserData';
import UserCard from '../UserCard';

jest.mock('react-redux');

describe('UserCard', () => {
  it('should display a bit of user info in as a card', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) =>
      callback({
        userData: {
          userData: {
            email: 'mail@mail.com',
            lastName: 'Last',
            firstName: 'First',
            username: 'user'
          } as UserData
        }
      })
    );
    const wrapper = shallow(<UserCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
