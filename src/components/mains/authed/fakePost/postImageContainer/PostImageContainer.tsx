import React, { useEffect, useState } from 'react';
import ImageNext from 'next/image';

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
  if (!imgSizes) {
    return <div>Image</div>;
  }

  return (
    <div className="relative w-full h-full">
      <ImageNext
        src={imageBase64Url}
        className={'rounded-[16px]'}
        height={imgSizes[1]}
        width={imgSizes[0]}
      />
    </div>
  );
};

export default PostImageContainer;
