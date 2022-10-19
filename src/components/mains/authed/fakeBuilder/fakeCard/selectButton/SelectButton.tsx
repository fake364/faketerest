import React from 'react';
import clsx from 'clsx';
import styles from './SelectButton.module.css';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';

type Props = {
  isSelected: boolean;
  isSelectionEnabled: boolean;
  onSelect: () => void;
};

const SelectButton: React.FC<Props> = ({
  isSelected,
  isSelectionEnabled,
  onSelect
}) => {
  return (
    <div
      className={clsx(
        styles.selectButton,
        isSelected ? styles.activeStyle : styles.inactiveStyle,
        isSelectionEnabled && styles.selectionModeStyle
      )}
      onClick={onSelect}
    >
      <FaCheck className={'icon text-[18px]'} />
    </div>
  );
};

export default SelectButton;
