import React from 'react';
import { shallow } from 'enzyme';
import SliderPageWrapper from '../SliderPageWrapper';
import { SLIDER_THEMES } from '../../../../../../../common/enums/slider_themes';

describe('SliderPageWrapper', () => {
  it('should render all supplements in slider', () => {
    const wrapper = shallow(
      <SliderPageWrapper
        animated={true}
        shownType={SLIDER_THEMES.HOME_DECOR}
        pageSlidingStopped={false}
        onClickDown={jest.fn()}
        onClickUp={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render modified component with stop class', () => {
    const wrapper = shallow(
      <SliderPageWrapper
        animated={true}
        shownType={SLIDER_THEMES.HOME_DECOR}
        pageSlidingStopped={true}
        onClickDown={jest.fn()}
        onClickUp={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
