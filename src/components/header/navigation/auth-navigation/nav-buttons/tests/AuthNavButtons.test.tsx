import React from 'react';
import { shallow } from 'enzyme';
import AuthNavButtons from '../AuthNavButtons';

describe('AuthNavButtons', () => {
  it('should render some buttons with tooltips', () => {
    const wrapper = shallow(<AuthNavButtons />);
    expect(wrapper).toMatchSnapshot();
  });
});
