import React from 'react';
import { shallow } from 'enzyme';
import PointsContainer from '../PointsContainer';
import { SLIDER_THEMES } from '../../../../../../../common/enums/slider_themes';
import SliderNode from '../../../../../../../common/classes/customClasses/SliderNode';

describe('PointsContainer', () => {
  it('should render some slider nodes', () => {
    const wrapper = shallow(
      <PointsContainer
        sliderNodes={[
          new SliderNode(SLIDER_THEMES.HOME_DECOR),
          new SliderNode(SLIDER_THEMES.NEW_OUTFIT)
        ]}
        shownType={SLIDER_THEMES.HOME_DECOR}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
