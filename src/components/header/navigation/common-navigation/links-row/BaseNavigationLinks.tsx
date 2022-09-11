import React from 'react';
import BaseLink from '../link/BaseLink';
import useTranslation from 'next-translate/useTranslation';

type Props = {};

const BaseNavigationLinks: React.FC<Props> = () => {
	const { t } = useTranslation('main-page');
	return (
		<>
			<BaseLink className="mr-10 text-blue" href={'/about'}>
				{t('links.base.description')}
			</BaseLink>
			<BaseLink className="mr-10" href={'/business'}>
				{t('links.base.business')}
			</BaseLink>
			<BaseLink className="mr-10" href={'/blog'}>
				{t('links.base.blog')}
			</BaseLink>
		</>
	);
};

export default BaseNavigationLinks;
