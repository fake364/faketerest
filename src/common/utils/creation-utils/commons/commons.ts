import CommonUtils from '../arrays/common';
import NumericFunctions from '../../functional-utils/numeric/utils.map';

const getSliderIndexArray = () => [
	...CommonUtils.numericPalindrome(4, 1),
	...CommonUtils.range(28).map(NumericFunctions.adjustToIndex(7))
];

const SpecificCommons = { getSliderIndexArray };

export default SpecificCommons;
