const adjustToIndex =
	(increment = 1) =>
	(_num: number, index: number) =>
		index + increment;

const adjustToValue =
	(increment = 1) =>
	(value: number) =>
		value + increment;

const adjustTransform = (nums: number[]) => nums.map(adjustToValue());

const NumericFunctions = { adjustToIndex, adjustToValue, adjustTransform };

export default NumericFunctions;
