import React, { useEffect, useState } from 'react';
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

    return () => {
      document.body.style.overflow = oldOverflow;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-stretch">
      <TitleSwitcher shownType={type} />
      <PointsContainer sliderNodes={sliderNodes} shownType={type} />
      <RoundedArrowButton
        shownType={type}
        additionalStyles={'bouncing-arrow-button'}
      />
      <ImageFlexContainer shownType={type} />
    </div>
  );
};

export default MainPage;
