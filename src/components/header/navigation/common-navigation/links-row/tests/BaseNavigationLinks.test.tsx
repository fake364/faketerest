import React from 'react';
import { shallow } from 'enzyme';
import BaseNavigationLinks from '../BaseNavigationLinks';

describe('BaseNavigationLinks', () => {
  it('should render three BaseLinks', () => {
    const wrapper = shallow(<BaseNavigationLinks />);
    expect(wrapper).toMatchSnapshot();
  });
});
