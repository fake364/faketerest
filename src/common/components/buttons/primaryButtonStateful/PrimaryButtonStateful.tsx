import React from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
import SecondaryButton from '../secondary-button/SecondaryButton';
import { BaseButtonProps } from '../base/BaseButton';

type Props = {
  isActive: boolean;
  activeText: string;
  disabledText?: string;
} & BaseButtonProps;

const PrimaryButtonStateful: React.FC<Props> = ({
  isActive,
  activeText,
  disabledText = activeText,
  ...rest
}) => {
  return isActive ? (
    <PrimaryButton {...rest}>{activeText}</PrimaryButton>
  ) : (
    <SecondaryButton className={'pointer-events-none'}>
      {disabledText}
    </SecondaryButton>
  );
};

export default PrimaryButtonStateful;
