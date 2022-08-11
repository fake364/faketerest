import React from 'react';
import { shallow } from 'enzyme';
import RegForm from '../RegForm';
import { RegInputs } from '../regInputs/RegInputs';
import SecondaryRegForm from '../secondaryRegForm/SecondaryRegForm';
import LoginInputs from '../loginInputs/LoginInputs';

describe('RegForm', () => {
  it('should render Reg form if isRegShown true', () => {
    const wrapper = shallow(<RegForm isRegistrationShown={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render login form is isRegShown false', () => {
    const wrapper = shallow(<RegForm isRegistrationShown={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should switch regform to login form mode on trigger button callback', () => {
    let isRegistrationShown = true;
    let changeForm = jest.fn((flag: boolean) => (isRegistrationShown = flag));
    const wrapper = shallow(
      <RegForm
        isRegistrationShown={isRegistrationShown}
        setRegistrationShown={changeForm}
      />
    );
    expect(wrapper.find(RegInputs)).toHaveLength(1);
    wrapper.find(SecondaryRegForm).props().onTriggerFormMode();
    wrapper.setProps({
      isRegistrationShown: false,
      setRegistrationShown: changeForm
    });
    wrapper.update();
    expect(changeForm).toHaveBeenCalled();
    expect(wrapper.find(LoginInputs)).toHaveLength(1);
  });
});
