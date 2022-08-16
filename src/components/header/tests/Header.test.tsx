import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('Header', () => {
  it('should render header with content', () => {
    const wrapper = shallow(<Header>Text</Header>);
    expect(wrapper).toMatchSnapshot();
  });
});
