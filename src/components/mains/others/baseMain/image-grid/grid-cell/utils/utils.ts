import { SLIDER_THEMES } from '../../../../../../../common/enums/slider_themes';
import CommonUtils from '../../../../../../../common/utils/creation-utils/arrays/common';
import { ImageProps } from 'next/image';

type SrcProps = Array<ImageProps['src']>;

export const getImageById = (
	type: SLIDER_THEMES,
	index: number
): ImageProps['src'] =>
	require(`../../../../../../../../public/images/main-slider/${type}/${
		index + 1
	}.jpeg`);

const getImagesObjEntry = (theme: SLIDER_THEMES) => ({
	[theme]: CommonUtils.arrayOfImagesByType(theme)
});

export const getSliderImagesMap = () =>
	CommonUtils.enumToArray().reduce(
		(prev, current) => ({ ...prev, ...getImagesObjEntry(current) }),
		{}
	) as Record<SLIDER_THEMES, SrcProps>;
