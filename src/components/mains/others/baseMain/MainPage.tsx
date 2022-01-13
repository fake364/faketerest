import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import CircularLinkedNode from '../../../../common/classes/structureClasses/CircularLinkedNode';
import SliderNode, {
	SLIDER_ARRAY
} from '../../../../common/classes/customClasses/SliderNode';
import PointsContainer from './slider/points-container/PointsContainer';
import TitleSwitcher from './slider/title-switcher/TitleSwitcher';

type Props = {};

// TODO create slider class
const sliderNodes = SliderNode.createThemesArray(SLIDER_ARRAY);

const MainPage: React.FC<Props> = () => {
	const [sliderListNode, setSliderNode] = useState(
		CircularLinkedNode.initializeCircleList<SliderNode>(sliderNodes, 0)
	);

	const {
		value: { type }
	} = sliderListNode;

	useEffect(() => {
		const intervalId = setInterval(
			() => setSliderNode(({ nextNode }) => nextNode),
			3000
		);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="w-full flex flex-col items-stretch">
			<TitleSwitcher currentTheme={type} />
			<PointsContainer sliderNodes={sliderNodes} shownType={type} />
		</div>
	);
};

export default MainPage;
