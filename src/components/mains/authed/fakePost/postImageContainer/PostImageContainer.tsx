import React, { useEffect, useState } from 'react';
import ImageNext from 'next/image';
import clsx from 'clsx';
import { mobileCheck } from '../../../../../common/utils/mobileCheck/mobileCheck';

type Props = { imageBase64Url: string };

const PostImageContainer: React.FC<Props> = ({ imageBase64Url }) => {
  const [imgSizes, setImgSizes] = useState<[number, number]>();

  useEffect(() => {
    const image = new Image();
    image.onload = function () {
      setImgSizes([image.width, image.height]);
    };
    image.src = imageBase64Url;
  }, []);

  if (!imgSizes || !imageBase64Url) {
    return <div>Image</div>;
  }
  const screenWidth = document.documentElement.clientWidth;
  const relativeToScreenHeight = (screenWidth * imgSizes[1]) / imgSizes[0];
  const isMobile = mobileCheck();

  return (
    <div
      className={clsx('relative w-full ', !isMobile && 'max-h-[684px]')}
      style={{ height: isMobile ? relativeToScreenHeight : imgSizes[1] }}
    >
      <ImageNext
        src={imageBase64Url}
        className={!isMobile && 'rounded-[16px]'}
        height={imgSizes[1]}
        width={imgSizes[0]}
        layout={'fill'}
        objectFit={'cover'}
        objectPosition={'center'}
      />
    </div>
  );
};

export default PostImageContainer;
