import React from 'react';
import { mount } from 'enzyme';
import ThemeContext from '../../../../../../common/context/ThemeContext';
import { THEME_TYPE } from '../../../../../../common/enums/theme';
import LogoTitle from '../LogoTitle';

jest.mock('../../../../../../../public/logo.png', () => () => '');
jest.mock('next/image', () => () => <div id="image" />);

describe('LogoTitle', () => {
  it('should setup theme for logo', () => {
    const wrapper = mount(
      <ThemeContext.Provider
        value={{ theme: THEME_TYPE.BASE, setTheme: jest.fn() }}
      >
        <LogoTitle />
      </ThemeContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
