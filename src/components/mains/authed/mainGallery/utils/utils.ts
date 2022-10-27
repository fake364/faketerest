const ROW_SPAN_HEIGHTS = {
  3: 111,
  4: 148,
  5: 185,
  6: 222,
  7: 259,
  8: 296,
  9: 333,
  10: 370,
  11: 407,
  12: 444
};

const ROW_SPAN_CLASSES = {
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  7: 'row-span-7',
  8: 'row-span-8',
  9: 'row-span-9',
  10: 'row-span-10',
  11: 'row-span-11',
  12: 'row-span-12'
};

const isHeightBetween = (height: number, min: number, max: number) =>
  height >= ROW_SPAN_HEIGHTS[min] && height < ROW_SPAN_HEIGHTS[max];

export const getImageColSpanByHeight = (height: number) => {
  for (let i = 2; i < 12; i++) {
    if (isHeightBetween(height, i, i + 1)) {
      return ROW_SPAN_CLASSES[i + 1];
    }
  }
  return '';
};

export const POSTS_FETCH_LIMIT = 20;
