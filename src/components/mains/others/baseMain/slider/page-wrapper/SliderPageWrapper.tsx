import { BouncingButtons } from '../../bouncing-buttons/BouncingButtons';
import clsx from 'clsx';
import TitleSwitcher from '../title-switcher/TitleSwitcher';
import PointsContainer from '../points-container/PointsContainer';
import ImageFlexContainer from '../../image-grid/ImageFlexContainer';
import React, { FC } from 'react';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';
import SliderNode, {
  SLIDER_ARRAY
} from '../../../../../../common/classes/customClasses/SliderNode';

const sliderNodes = SliderNode.createThemesArray(SLIDER_ARRAY);

type Props = {
  animated: boolean;
  shownType: SLIDER_THEMES;
  pageSlidingStopped: boolean;
  onClickDown: () => void;
  onClickUp: () => void;
};

const SliderPageWrapper: FC<Props> = ({
  pageSlidingStopped,
  animated,
  onClickUp,
  onClickDown,
  shownType
}) => (
  <>
    <BouncingButtons
      isAnimated={animated}
      shownType={shownType}
      onClickDown={onClickDown}
      onClickUp={onClickUp}
    />
    <div
      className={clsx(
        'w-full flex flex-col items-stretch relative z-[-1]',
        'animate-slide_bottom',
        pageSlidingStopped && 'stop-animation'
      )}
    >
      <TitleSwitcher shownType={shownType} isAnimation={animated} />
      <PointsContainer sliderNodes={sliderNodes} shownType={shownType} />
      <ImageFlexContainer shownType={shownType} isAnimation={animated} />
    </div>
  </>
);

export default SliderPageWrapper;
