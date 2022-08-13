import { shallow } from 'enzyme';
import RegFormHeader from '../RegFormHeader';
import React from 'react';

describe('RegFormHeader', () => {
  it('should render reg form header with logo', () => {
    const wrapper = shallow(<RegFormHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
