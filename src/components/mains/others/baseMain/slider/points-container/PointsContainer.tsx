import React from 'react';
import SliderPoint from '../slider-point/SliderPoint';
import SliderNode from '../../../../../../common/classes/customClasses/SliderNode';
import { CommonTypes } from '../../../../../../common/types/common';

interface Props extends CommonTypes.ShownType {
	sliderNodes: SliderNode[];
}

const PointsContainer: React.FC<Props> = ({ sliderNodes, shownType }) => {
	return (
		<div className="flex justify-center mt-10">
			{sliderNodes.map(({ type: nodeType }) => (
				<SliderPoint pointType={nodeType} shownType={shownType} key={nodeType} />
			))}
		</div>
	);
};

export default PointsContainer;
