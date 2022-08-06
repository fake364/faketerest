import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../MainPage';
import { SLIDER_THEMES } from '../../../../../common/enums/slider_themes';

describe('MainPage', () => {
  describe('constructor', () => {
    it('should initialize slider circular list', () => {
      const component = shallow(<MainPage />);
      expect(
        (component.instance() as MainPage).state.sliderListNode.value.type
      ).toBe(SLIDER_THEMES.DINNER_IDEA);
    });
  });
});
