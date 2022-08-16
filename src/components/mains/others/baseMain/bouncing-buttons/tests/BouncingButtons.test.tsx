import React from 'react';
import { shallow } from 'enzyme';
import { BouncingButtons } from '../BouncingButtons';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';

describe('BouncingButtons', () => {
  it('should render animated down button', () => {
    const wrapper = shallow(
      <BouncingButtons
        isAnimated={true}
        shownType={SLIDER_THEMES.HOME_DECOR}
        onClickUp={jest.fn()}
        onClickDown={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render not animated up button', () => {
    const wrapper = shallow(
      <BouncingButtons
        isAnimated={false}
        shownType={SLIDER_THEMES.HOME_DECOR}
        onClickUp={jest.fn()}
        onClickDown={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
