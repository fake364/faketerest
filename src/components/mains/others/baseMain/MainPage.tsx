import React, { useEffect, useState } from 'react';
import CircularLinkedNode from '../../../../common/classes/structureClasses/CircularLinkedNode';
import SliderNode, {
  SLIDER_ARRAY
} from '../../../../common/classes/customClasses/SliderNode';
import PointsContainer from './slider/points-container/PointsContainer';
import TitleSwitcher from './slider/title-switcher/TitleSwitcher';
import ImageFlexContainer from './image-grid/ImageFlexContainer';
import { sliderTimeout } from '../../../../common/constants/commons';
import clsx from 'clsx';
import { findAndSetHeaderVisibility } from './image-grid/flex-cell/utils/utils';
import { BouncingButtons } from './bouncing-buttons/BouncingButtons';

type Props = {};

const sliderNodes = SliderNode.createThemesArray(SLIDER_ARRAY);

const MainPage: React.FC<Props> = () => {
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [sliderListNode, setSliderNode] = useState(
    CircularLinkedNode.initializeCircleList<SliderNode>(sliderNodes, 0)
  );
  const [isPageSlidingStopped, setIsStopped] = useState<boolean>(true);

  const {
    value: { type }
  } = sliderListNode;

  const initiateSlider = () => {
    findAndSetHeaderVisibility('visible');
    const intervalId = setInterval(
      () => setSliderNode(({ nextNode }) => nextNode),
      sliderTimeout
    );
    setTimer(intervalId);
    return intervalId;
  };

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const intervalId = initiateSlider();
    return () => {
      document.body.style.overflow = oldOverflow;
      clearInterval(intervalId);
    };
  }, []);

  const takeASlide = (postEffect?: () => void) => {
    setIsStopped(false);
    setTimeout(() => {
      setIsStopped(true);
      postEffect && postEffect();
    }, 2000);
  };

  const onClickJumpingButtonDown = () => {
    if (timer) {
      clearInterval(timer);

      setTimeout(() => {
        setTimer(undefined);
        takeASlide();
        findAndSetHeaderVisibility('hidden');
      }, 1000);
    }
  };

  const onClickJumpingButtonUp = () => {
    takeASlide(() => {
      initiateSlider();
      findAndSetHeaderVisibility('visible');
    });
  };

  const isAnimation = Boolean(timer);

  // TODO to add animation of moving container up and down
  return (
    <>
      <BouncingButtons
        isAnimated={isAnimation}
        shownType={type}
        onClickDown={onClickJumpingButtonDown}
        onClickUp={onClickJumpingButtonUp}
      />
      <div
        className={clsx(
          'w-full flex flex-col items-stretch relative z-[-1]',
          'animate-slide_bottom',
          isPageSlidingStopped && 'stop-animation'
        )}
      >
        <TitleSwitcher shownType={type} isAnimation={isAnimation} />
        <PointsContainer sliderNodes={sliderNodes} shownType={type} />
        <ImageFlexContainer shownType={type} isAnimation={isAnimation} />
      </div>
    </>
  );
};

export default MainPage;
