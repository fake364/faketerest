import React from 'react';
import SliderPoint from '../slider-point/SliderPoint';
import SliderNode from '../../../../../../common/classes/customClasses/SliderNode';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';

type Props = {
	sliderNodes: SliderNode[];
	shownType: SLIDER_THEMES;
};

const PointsContainer: React.FC<Props> = ({ sliderNodes, shownType }) => {
	return (
		<div className="flex justify-center mt-10">
			{sliderNodes.map(({ type: nodeType }) => (
				<SliderPoint
					pointType={nodeType}
					shownType={shownType}
					key={nodeType}
				/>
			))}
		</div>
	);
};

export default PointsContainer;
