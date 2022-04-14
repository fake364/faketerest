import BaseButton from '../../../../../../../common/components/buttons/base/BaseButton';
import React, { FC, FormEvent } from 'react';
import { IconType } from 'react-icons';
import clsx from 'clsx';

type Props = {
  text: string;
  Icon: IconType;
  onClick: (e: FormEvent) => void;
  className?: string;
};

const IconTextButton: FC<Props> = ({ text, Icon, onClick, className }) => (
  <BaseButton
    className={clsx(
      'mt-[8px] self-stretch rounded-common_radius py-[8px]',
      className
    )}
    onClick={onClick}
  >
    <div className="flex items-center justify-evenly">
      <Icon className="mr-[8px] text-[24px]" />
      <div>{text}</div>
    </div>
  </BaseButton>
);

export default IconTextButton;
