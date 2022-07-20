// eslint-disable-next-line max-len
import RoundedArrowButton from '../../../../../common/components/buttons/icon-button/prepared-components/RoundedArrowButton';
import React, { FC } from 'react';
import { SLIDER_THEMES } from '../../../../../common/enums/slider_themes';

type Props = {
  isAnimated: boolean;
  shownType: SLIDER_THEMES;
  onClickUp: () => void;
  onClickDown: () => void;
};
export const BouncingButtons: FC<Props> = ({
  isAnimated,
  shownType,
  onClickUp,
  onClickDown
}) => (
  <>
    {isAnimated && (
      <RoundedArrowButton
        shownType={shownType}
        additionalStyles={'bouncing-arrow-button arrow-button-up'}
        onClick={onClickDown}
      />
    )}
    {!isAnimated && (
      <RoundedArrowButton
        shownType={shownType}
        additionalStyles={'bouncing-arrow-button arrow-button-down mt-[24px]'}
        isArrowUp
        onClick={onClickUp}
      />
    )}
  </>
);
