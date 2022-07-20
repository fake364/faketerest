import React, { useEffect } from 'react';
import { SLIDER_THEMES } from '../../../../common/enums/slider_themes';
import CommonUtils from '../../../../common/utils/creation-utils/arrays/common';
import Image from 'next/image';
import clsx from 'clsx';

type Props = {};

const LoginBackImages: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className="flex flex-wrap gap-[16px] px-[52px] py-[18px]">
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.6)] top-0 left-0 z-10" />
      {children}
      {CommonUtils.arrayOfImagesByType(SLIDER_THEMES.HOME_DECOR).map(
        (image) => (
          <div className="flex-1 relative basis-[200px] h-[400px]">
            <Image
              className={clsx('rounded-[16px]')}
              src={image}
              layout={'fill'}
              objectFit="cover"
            />
          </div>
        )
      )}
    </div>
  );
};

export default LoginBackImages;
