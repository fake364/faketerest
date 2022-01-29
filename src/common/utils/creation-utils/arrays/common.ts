import { SLIDER_THEMES } from '../../../enums/slider_themes';
import { getImageById } from '../../../../components/mains/others/baseMain/image-grid/grid-cell/utils/utils';

const range = <T>(count: number) => Array.from(Array<T>(count).keys());

const numericPalindrome = (palNum: number, startFrom?: number) => {
	const arr: number[] = [];
	for (let i = startFrom || 0; i <= palNum; i++) {
		arr.push(i);
	}
	for (let i = palNum - 1; i >= startFrom || 0; i--) {
		arr.push(i);
	}
	return arr;
};

const returnOnlyInRange = (num: number, inRangeOf: number[]) =>
	inRangeOf.includes(num) ? num : null;

const returnInSimpleRange = (
	num: number,
	to: number,
	manipulate?: (range: number[]) => number[]
) => {
	const numRange = range<number>(to);
	const finalRange = manipulate ? manipulate(numRange) : numRange;

	return returnOnlyInRange(num, finalRange);
};

const enumToArray = (): SLIDER_THEMES[] => {
	return Object.keys(SLIDER_THEMES).map((key) => SLIDER_THEMES[key]);
};

const arrayOfImagesByType = (theme: SLIDER_THEMES) =>
	CommonUtils.range(35).map((value) => getImageById(theme, value));

const CommonUtils = {
	range,
	numericPalindrome,
	returnInSimpleRange,
	returnOnlyInRange,
	enumToArray,
	arrayOfImagesByType
};

export default CommonUtils;
