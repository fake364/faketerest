export const getGalleryItemSizes = (width: number, height: number) => {
  const fixWidth = 236;
  let fixHeight = (fixWidth * height) / width;
  if (fixHeight > 419) {
    fixHeight = 419;
  }
  return { width: fixWidth, height: fixHeight };
};
