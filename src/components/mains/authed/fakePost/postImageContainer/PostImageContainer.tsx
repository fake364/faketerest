import React, { useEffect, useState } from 'react';
import ImageNext from 'next/image';
import clsx from 'clsx';

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

  return (
    <div
      className={clsx('relative w-full max-h-[684px]')}
      style={{ height: imgSizes[1] }}
    >
      <ImageNext
        src={imageBase64Url}
        className={'rounded-[16px]'}
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
