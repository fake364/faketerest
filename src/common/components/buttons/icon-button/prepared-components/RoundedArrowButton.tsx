import React from 'react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import IconButton from '../IconButton';
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp';
import { CommonTypes } from '../../../../types/common';

interface Props extends Partial<CommonTypes.ShownType> {
  isArrowUp?: boolean;
  additionalStyles?: string;
  onClick: () => void;
}

const RoundedArrowButton: React.FC<Props> = ({
  shownType,
  isArrowUp = false,
  additionalStyles = '',
  onClick
}) => {
  return (
    <IconButton
      slider-theme={shownType}
      Icon={isArrowUp ? FaChevronUp : FaChevronDown}
      className={`p-3 text-white text-[24px] bg-slider_theme rounded-full ${additionalStyles}`}
      onClick={onClick}
    />
  );
};

export default RoundedArrowButton;
