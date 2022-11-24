import React from 'react';
import Link from 'next/link';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import clsx from 'clsx';

type Props = { navigateTo: string; title: string; className?: string };

const ChevronLinkButton: React.FC<Props> = ({
  navigateTo,
  title,
  className
}) => {
  return (
    <Link href={navigateTo}>
      <div className={clsx('flex justify-between items-center', className)}>
        <div className={'font-medium text-[18px]'}>{title}</div>
        <FaChevronRight />
      </div>
    </Link>
  );
};

export default ChevronLinkButton;
