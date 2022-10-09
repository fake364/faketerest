import React from 'react';
import Dropdown, { DropdownProps } from '../Dropdown';
import clsx from 'clsx';

type Props = { title: string } & DropdownProps;

const LabeledDropdown: React.FC<Props> = ({
  title,
  children,
  className,
  ...rest
}) => {
  return (
    <>
      <label className="text-[14px] font-[300]">{title}</label>
      <Dropdown className={clsx('mt-[4px]', className)} {...rest}>
        {children}
      </Dropdown>
    </>
  );
};

export default LabeledDropdown;
