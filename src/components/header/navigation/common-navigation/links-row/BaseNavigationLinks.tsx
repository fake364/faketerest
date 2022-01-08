import React from 'react';
import BaseLink from '../link/BaseLink';

type Props = {};

const BaseNavigationLinks: React.FC<Props> = () => {
	return (
		<>
			<BaseLink className="mr-10" href={'/about'}>
				Описание
			</BaseLink>
			<BaseLink className="mr-10" href={'/business'}>
				Бизнес
			</BaseLink>
			<BaseLink className="mr-10" href={'/blog'}>
				Бизнес
			</BaseLink>
		</>
	);
};

export default BaseNavigationLinks;
