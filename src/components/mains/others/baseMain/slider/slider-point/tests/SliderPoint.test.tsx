import React from 'react';
import { shallow } from 'enzyme';
import SliderPoint from '../SliderPoint';
import { SLIDER_THEMES } from '../../../../../../../common/enums/slider_themes';

describe('SliderPoint', () => {
  it('should display not active point if selected point doesnt match current', () => {
    const wrapper = shallow(
      <SliderPoint
        pointType={SLIDER_THEMES.NEW_OUTFIT}
        shownType={SLIDER_THEMES.HOME_DECOR}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should display active point if it is selected point', () => {
    const wrapper = shallow(
      <SliderPoint
        pointType={SLIDER_THEMES.HOME_DECOR}
        shownType={SLIDER_THEMES.HOME_DECOR}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
