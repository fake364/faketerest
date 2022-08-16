import React from 'react';
import { shallow } from 'enzyme';
import ImageFlexContainer from '../ImageFlexContainer';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';

describe('ImageFlexContainer', () => {
  it('should render container of images with margins and delays', () => {
    const wrapper = shallow(
      <ImageFlexContainer
        isAnimation={true}
        shownType={SLIDER_THEMES.HOME_DECOR}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
