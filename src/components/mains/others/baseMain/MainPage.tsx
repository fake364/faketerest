import React from 'react';
import CircularLinkedNode from '../../../../common/classes/structureClasses/CircularLinkedNode';
import SliderNode, {
  SLIDER_ARRAY
} from '../../../../common/classes/customClasses/SliderNode';
import { sliderTimeout } from '../../../../common/constants/commons';
import { findAndSetHeaderVisibility } from './image-grid/flex-cell/utils/utils';
import SliderPageWrapper from './slider/page-wrapper/SliderPageWrapper';
import { Nullable } from '../../../../common/types/common';
import RegistrationFormWrapper from './regForm/RegistrationFormWrapper';

type State = {
  timer: Nullable<NodeJS.Timer>;
  sliderListNode: CircularLinkedNode<SliderNode>;
  isPageSlidingStopped: boolean;
};

const sliderNodes = SliderNode.createThemesArray(SLIDER_ARRAY);

class MainPage extends React.Component<{}, State> {
  oldBodyOverflow: string;

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      sliderListNode: CircularLinkedNode.initializeCircleList<SliderNode>(
        sliderNodes,
        0
      ),
      isPageSlidingStopped: true
    };
  }

  initiateSlider = () => {
    const { sliderListNode } = this.state;
    findAndSetHeaderVisibility('visible');
    const intervalId = setInterval(
      () => this.setState({ sliderListNode: sliderListNode.nextNode }),
      sliderTimeout
    );
    this.setState({ timer: intervalId });
  };

  componentDidMount() {
    this.oldBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.initiateSlider();
  }

  componentWillUnmount() {
    const { timer } = this.state;
    document.body.style.overflow = this.oldBodyOverflow;
    clearInterval(timer);
  }

  takeASlide = (postEffect?: () => void) => {
    this.setState({ isPageSlidingStopped: false });
    setTimeout(() => {
      this.setState({ isPageSlidingStopped: true });
      postEffect && postEffect();
    }, 2000);
  };

  onClickJumpingButtonDown = () => {
    console.log(this);
    const { timer } = this.state;
    if (timer) {
      clearInterval(timer);

      setTimeout(() => {
        this.setState({ timer: null });
        this.takeASlide();
        findAndSetHeaderVisibility('hidden');
      }, 1000);
    }
  };

  onClickJumpingButtonUp = () => {
    this.takeASlide(() => {
      this.initiateSlider();
      findAndSetHeaderVisibility('visible');
    });
  };

  render() {
    const { sliderListNode, timer, isPageSlidingStopped } = this.state;

    const {
      value: { type }
    } = sliderListNode;

    const isAnimation = Boolean(timer);

    return (
      <>
        <SliderPageWrapper
          animated={isAnimation}
          shownType={type}
          onClickDown={this.onClickJumpingButtonDown}
          onClickUp={this.onClickJumpingButtonUp}
          pageSlidingStopped={isPageSlidingStopped}
        />
        {!isAnimation && isPageSlidingStopped && <RegistrationFormWrapper />}
      </>
    );
  }
}

export default MainPage;
