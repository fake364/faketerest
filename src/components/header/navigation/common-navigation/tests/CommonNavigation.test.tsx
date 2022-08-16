import React from 'react';
import { mount } from 'enzyme';
import ThemeContext from '../../../../../common/context/ThemeContext';
import { THEME_TYPE } from '../../../../../common/enums/theme';
import CommonNavigation from '../CommonNavigation';

describe('CommonNavigation', () => {
  it('should display logo, and links for BASE theme', () => {
    const component = mount(
      <ThemeContext.Provider value={{ theme: THEME_TYPE.BASE }}>
        <CommonNavigation />
      </ThemeContext.Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
