import React from 'react';
import { shallow } from 'enzyme';
import LoginButtons from '../LoginButtons';

describe('LoginButtons', () => {
  it('should render two buttons, one secondary and another primary', () => {
    const wrapper = shallow(<LoginButtons />);
    expect(wrapper).toMatchSnapshot();
  });
});
