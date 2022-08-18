import React from 'react';
import { shallow } from 'enzyme';
import SecondaryRegForm from '../SecondaryRegForm';

describe('SecondaryRegForm', () => {
  it('should render switcher if there is a trigger callback', () => {
    const wrapper = shallow(
      <SecondaryRegForm
        isRegistrationForm={false}
        onTriggerFormMode={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render registration button', () => {
    const wrapper = shallow(
      <SecondaryRegForm isRegistrationForm={true} onTriggerFormMode={jest.fn} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render switcher if registration trigger is not present', () => {
    const wrapper = shallow(<SecondaryRegForm isRegistrationForm={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
