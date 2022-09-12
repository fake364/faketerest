import React from 'react';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

type Props = { className?: string };

const SearchInput: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation('common');
  return (
    <div className={clsx('relative', className)}>
      <input
        className="bg-[#efefef] rounded-[28px] px-[48px] w-full h-full outline-[4px] focus:outline
         focus:outline-[rgba(0,132,255,0.5)]"
        placeholder={t('header.search')}
      />
      <div className="absolute top-0 h-full flex items-center">
        <FaSearch className="ml-[18px] text-[gray]" />
      </div>
    </div>
  );
};

export default SearchInput;
