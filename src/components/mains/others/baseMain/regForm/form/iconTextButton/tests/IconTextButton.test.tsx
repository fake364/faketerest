import { shallow } from 'enzyme';
import React from 'react';
import IconTextButton from '../IconTextButtom';
import { FaAddressBook } from '@react-icons/all-files/fa/FaAddressBook';

describe('IconTextButton', () => {
  it('should render base button with icon and text', () => {
    const wrapper = shallow(
      <IconTextButton text={'Text'} Icon={FaAddressBook} onClick={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
