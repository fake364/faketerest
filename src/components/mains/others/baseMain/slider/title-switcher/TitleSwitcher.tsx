import React from 'react';
import { useTranslation } from 'next-i18next';
import { CommonTypes } from '../../../../../../common/types/common';

const TitleSwitcher: React.FC<CommonTypes.ShownType> = ({ shownType }) => {
	const { t } = useTranslation('common');

	return (
		<div className="flex-1 flex flex-col items-center mt-24 relative">
			<span className="text-[60px] font-normal">
				{t('titles.base.mainPage.slider.getYourNext')}
			</span>
			<span
				slider-theme={shownType}
				className="text-slider_theme text-[50px] animate-move_and_disappear ease-out"
			>
				{t(`titles.base.mainPage.slider.${shownType}`)}
			</span>
		</div>
	);
};

export default TitleSwitcher;
