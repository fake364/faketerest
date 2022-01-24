import React from 'react';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';
import { CommonTypes } from '../../../../../../common/types/common';
import clsx from 'clsx';

interface Props extends CommonTypes.ShownType {
	pointType: SLIDER_THEMES;
}

const SliderPoint: React.FC<Props> = ({ pointType, shownType }) => {
	const isCurrentPoint = pointType === shownType;
	const className = isCurrentPoint ? 'slider-active' : 'slider-not-active';
	return (
		<div slider-theme={pointType} className={clsx('last:m-0', className)} />
	);
};

export default SliderPoint;
