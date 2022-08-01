import React from 'react';

import { shallow } from 'enzyme';
import LoginButtonsContainer from '../LoginButtonsContainer';

describe('LoginButtonsContainer', () => {
  it('should render something in container and login buttons', () => {
    const wrapper = shallow(<LoginButtonsContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
