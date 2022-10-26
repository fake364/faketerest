import React from 'react';
import { FAKE_SNACK_THEMES } from '../constants';
import styles from './FakeSnack.module.css';
import clsx from 'clsx';

export type FakeSnackProps = {
  theme?: FAKE_SNACK_THEMES;
  text: string;
  id?: Symbol;
};

const getStyle = (theme: FAKE_SNACK_THEMES) => {
  switch (theme) {
    default:
      return styles.defaultStyle;
  }
};

const FakeSnack: React.FC<FakeSnackProps> = ({
  theme = FAKE_SNACK_THEMES.DEFAULT,
  text
}) => {
  return (
    <div
      className={clsx(styles.defaultAnimation, 'w-[300px]', getStyle(theme))}
    >
      {text}
    </div>
  );
};

export default FakeSnack;
