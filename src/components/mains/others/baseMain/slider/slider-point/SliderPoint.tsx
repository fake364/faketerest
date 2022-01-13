import React from 'react';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';

type Props = { pointType: SLIDER_THEMES; shownType: SLIDER_THEMES };

const SliderPoint: React.FC<Props> = ({ pointType, shownType }) => {
	const isCurrentPoint = pointType === shownType;
	const className = isCurrentPoint ? 'slider-active' : 'slider-not-active';
	return <div slider-theme={pointType} className={className} />;
};

export default SliderPoint;
