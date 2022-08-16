import React from 'react';
import { shallow } from 'enzyme';
import ParamsArrowDropdown from '../ParamsArrowDropdown';
import ButtonDropdownElement from '../../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import * as redux from 'react-redux';
import axios from 'axios';

jest.mock('react-redux');

describe('ParamsArrowDropdown', () => {
  it('should trigger logout call on click on logout button', async () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchSpy);
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockReturnValue(Promise.resolve());
    const wrapper = shallow(<ParamsArrowDropdown />);
    await wrapper.find(ButtonDropdownElement).last().props().onClick();
    expect(dispatchSpy).toBeCalledWith({ type: 'WIPE_STATE' });
    expect(axiosSpy).toBeCalledWith('/api/logout');
  });
});
