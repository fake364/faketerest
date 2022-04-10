import React from 'react';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import { ShownType } from '../../../../../../common/types/common';

type Props = { isAnimation: boolean } & ShownType;

const TitleSwitcher: React.FC<Props> = ({ shownType, isAnimation }) => {
  const { t } = useTranslation('main-page');

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
