import React from 'react';
import { useTranslation } from 'next-i18next';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';

type Props = { currentTheme: SLIDER_THEMES };

const TitleSwitcher: React.FC<Props> = ({ currentTheme }) => {
	const { t } = useTranslation('common');

	return (
		<div className="flex-1 flex flex-col items-center mt-24 relative">
			<span className="text-[60px] font-normal">
				{t('titles.base.mainPage.slider.getYourNext')}
			</span>
			<span
				slider-theme={currentTheme}
				className="text-slider_theme text-[50px] animate-move_and_disappear ease-out"
			>
				{t(`titles.base.mainPage.slider.${currentTheme}`)}
			</span>
		</div>
	);
};

export default TitleSwitcher;
