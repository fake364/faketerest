import { mobileCheck } from '../../../../../../common/utils/mobileCheck/mobileCheck';

export const getGalleryItemSizes = (width: number, height: number) => {
  const fixWidth = mobileCheck()
    ? document.documentElement.clientWidth / 2 - 18
    : 236;
  let fixHeight = (fixWidth * height) / width;
  if (fixHeight > 419) {
    fixHeight = 419;
  }
  return { width: fixWidth, height: fixHeight };
};
