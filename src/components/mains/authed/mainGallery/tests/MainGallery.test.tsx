import React from 'react';
import { shallow } from 'enzyme';
import MainGallery from '../MainGallery';

describe('MainGallery', () => {
  it('should render gallery', () => {
    const wrapper = shallow(<MainGallery />);
    expect(wrapper).toMatchSnapshot();
  });
});
