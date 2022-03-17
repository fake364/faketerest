import React from 'react';
import { useTranslation } from 'next-i18next';
import { CommonTypes } from '../../../../../../common/types/common';
import clsx from 'clsx';

type Props = { isAnimation: boolean } & CommonTypes.ShownType;

const TitleSwitcher: React.FC<Props> = ({ shownType, isAnimation }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex-1 flex flex-col items-center mt-24 relative">
      <span className="text-[60px] font-normal">
        {t('titles.base.mainPage.slider.getYourNext')}
      </span>
      <span
        slider-theme={shownType}
        className={clsx(
          'text-slider_theme',
          'text-[50px]',
          isAnimation && 'animate-move_and_disappear ease-out'
        )}
      >
        {t(`titles.base.mainPage.slider.${shownType}`)}
      </span>
    </div>
  );
};

export default TitleSwitcher;
