import React from 'react';
import clsx from 'clsx';
import ImageDnDUpload from './imageDnDUpload/ImageDnDUpload';
import UserAvatarImage from '../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';

type Props = { className?: string };

const FakeCard: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        'bg-[white] rounded-[16px] px-[48px] py-[36px] w-[880px] mt-[32px]',
        className
      )}
    >
      <div className="flex gap-[32px]">
        <ImageDnDUpload className={'flex-1'} />
        <div className={'flex-[2]'}>
          <input placeholder={'Добавьте название'} />
          <UserAvatarImage firstName={'valentin'} className={'w-[50px] h-[50px]'} />
          <input placeholder={'Добавить описание пина'} />
        </div>
      </div>
    </div>
  );
};

export default FakeCard;
