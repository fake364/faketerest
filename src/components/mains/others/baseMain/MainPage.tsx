import React, { useEffect, useRef, useState } from 'react';
import CircularLinkedNode from '../../../../common/classes/structureClasses/CircularLinkedNode';
import SliderNode, {
  SLIDER_ARRAY
} from '../../../../common/classes/customClasses/SliderNode';
import PointsContainer from './slider/points-container/PointsContainer';
import TitleSwitcher from './slider/title-switcher/TitleSwitcher';
import RoundedArrowButton from '../../../../common/components/buttons/icon-button/prepared-components/RoundedArrowButton';
import ImageFlexContainer from './image-grid/ImageFlexContainer';
import { sliderTimeout } from '../../../../common/constants/commons';

type Props = {};

const sliderNodes = SliderNode.createThemesArray(SLIDER_ARRAY);

const MainPage: React.FC<Props> = () => {
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [sliderListNode, setSliderNode] = useState(
    CircularLinkedNode.initializeCircleList<SliderNode>(sliderNodes, 0)
  );

  const {
    value: { type }
  } = sliderListNode;

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const intervalId = setInterval(
      () => setSliderNode(({ nextNode }) => nextNode),
      sliderTimeout
    );
    setTimer(intervalId);
    return () => {
      document.body.style.overflow = oldOverflow;
      clearInterval(intervalId);
    };
  }, []);

  const onClickJumpingButton = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
    }
  };

  // TODO to add animation of moving container up and down
  return (
    <>
      <RoundedArrowButton
        shownType={type}
        additionalStyles={'bouncing-arrow-button'}
        onClick={onClickJumpingButton}
      />
      <div className="w-full flex flex-col items-stretch relative">
        <TitleSwitcher shownType={type} isAnimation={Boolean(timer)} />
        <PointsContainer sliderNodes={sliderNodes} shownType={type} />
        <ImageFlexContainer shownType={type} isAnimation={Boolean(timer)} />
      </div>
    </>
  );
};

export default MainPage;
