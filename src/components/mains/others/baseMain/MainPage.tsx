import React from 'react';
import { useTranslation } from 'next-i18next';

type Props = {};

const MainPage: React.FC<Props> = () => {
	const { t } = useTranslation('common');

	return (
		<div className="w-full flex flex-col items-stretch">
			<div className="flex-1 flex flex-col items-center mt-24 relative">
				<span className="text-[60px] font-normal">
					{t('titles.base.mainPage.slider.getYourNext')}
				</span>
				<span className="text-[54px] font-normal absolute mt-24 transition duration-300 ease-out -translate-y-8">
					{t('titles.base.mainPage.slider.dinnerIdea')}
				</span>
			</div>
			<div className=""></div>
		</div>
	);
};

export default MainPage;
