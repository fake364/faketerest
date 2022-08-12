import React from 'react';
import { shallow } from 'enzyme';
import TitleSwitcher from '../TitleSwitcher';
import { SLIDER_THEMES } from '../../../../../../../common/enums/slider_themes';

describe('TitleSwitcher', () => {
  it('should match snapshot when is not animated', () => {
    const component = shallow(
      <TitleSwitcher isAnimation={false} shownType={SLIDER_THEMES.NEW_OUTFIT} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should add additional styles when it is animated', () => {
    const component = shallow(
      <TitleSwitcher isAnimation={true} shownType={SLIDER_THEMES.NEW_OUTFIT} />
    );
    expect(component).toMatchSnapshot();
  });
});
