import React, { useEffect } from 'react';
import { SLIDER_THEMES } from '../../../../common/enums/slider_themes';
import CommonUtils from '../../../../common/utils/creation-utils/arrays/common';
import Image from 'next/image';
import clsx from 'clsx';
import { mobileCheck } from '../../../../common/utils/mobileCheck/mobileCheck';

type Props = {};

const BackgroundImages: React.FC<Props> = ({ children }) => {
  const isMobile = mobileCheck();

  useEffect(() => {
    !isMobile && (document.body.style.overflow = 'hidden');
  }, []);

  return (
    <div
      className={clsx(
        'flex flex-wrap   py-[18px]',
        isMobile ? 'bg-[black] gap-[10px]' : 'px-[52px] gap-[16px]'
      )}
    >
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.6)] top-0 left-0 z-10" />
      {children}
      {CommonUtils.arrayOfImagesByType(SLIDER_THEMES.HOME_DECOR).map(
        (image) => (
          <div
            className={clsx(
              'flex-1 relative',
              isMobile
                ? 'basis-[30%] h-[30vh] max-w-[150px] min-h-[250px]'
                : 'basis-[200px] h-[400px]'
            )}
          >
            <Image
              className={clsx('rounded-[16px]')}
              src={image}
              loader={() => image as string}
              layout={'fill'}
              objectFit="cover"
            />
          </div>
        )
      )}
    </div>
  );
};

export default BackgroundImages;
