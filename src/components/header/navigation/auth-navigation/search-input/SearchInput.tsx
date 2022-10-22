import React from 'react';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import outlineStyles from '../../../../../common/utilityCss/Outline.module.css';

type Props = { className?: string };

const SearchInput: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation('common');
  return (
    <div className={clsx('relative', className)}>
      <input
        className={clsx(
          'bg-[#efefef] rounded-[28px] px-[48px] w-full h-full',
          outlineStyles.defaultFocusOutline
        )}
        placeholder={t('header.search')}
      />
      <div className="absolute top-0 h-full flex items-center">
        <FaSearch className="ml-[18px] text-[gray]" />
      </div>
    </div>
  );
};

export default SearchInput;
