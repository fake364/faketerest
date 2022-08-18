import React from 'react';
import { shallow } from 'enzyme';
import RegistrationFormWrapper from '../RegistrationFormWrapper';

describe('RegistrationFormWrapper', () => {
  it('should render RegForm with mode switcher', () => {
    const wrapper = shallow(<RegistrationFormWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});
