import React from 'react';
import { shallow } from 'enzyme';
import ImageCell from '../ImageCell';
import { SLIDER_THEMES } from '../../../../../../../common/enums/slider_themes';

describe('ImageCell', () => {
  it('should render three invisible images in one container and one visible depending on shown type', () => {
    const wrapper = shallow(
      <ImageCell
        images={['1', '2', '3', '4']}
        shownType={SLIDER_THEMES.HOME_DECOR}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
