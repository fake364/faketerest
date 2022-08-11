import React from 'react';
import { shallow } from 'enzyme';
import RegFormSpinner from '../RegFormSpinner';

describe('RegFormSpinner', () => {
  it('should render full screen spinner', () => {
    const wrapper = shallow(<RegFormSpinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
