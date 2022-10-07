import React from 'react';
import Dropdown from '../Dropdown';
import clsx from 'clsx';

type Props = { title: string; className?: string };

const LabeledDropdown: React.FC<Props> = ({ title, children, className }) => {
  return (
    <>
      <label className="text-[14px] font-[300]">{title}</label>
      <Dropdown className={clsx('mt-[4px]', className)}>{children}</Dropdown>
    </>
  );
};

export default LabeledDropdown;
