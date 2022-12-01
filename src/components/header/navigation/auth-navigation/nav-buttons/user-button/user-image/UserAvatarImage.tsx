import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';

type Props = { className?: string; firstName?: string; userId?: number };

const UserAvatarImage: React.FC<Props> = ({ firstName, className, userId }) => {
  const [isImageShown, setImageShown] = useState<boolean>(true);
  const myFirstName = useSelector(
    (state: RootState) => state.userData?.userData?.firstName
  );
  const myUserId = useSelector((state: RootState) => state.metadata.userId);
  const displayFirstName = firstName || myFirstName;
  const displayUserId = userId || myUserId;
  const src =
    `http://${window.location.host}/static-box/user/` + displayUserId + '/avatar.png';

  return (
    <div
      className={clsx(
        'relative',
        'flex justify-center items-center rounded-[50%]',
        className
      )}
    >
      {isImageShown ? (
        <Image
          src={src}
          loader={() => src}
          className={'rounded-[50%]'}
          onError={() => {
            setImageShown(false);
          }}
          onLoad={() => {
            setImageShown(true);
          }}
          layout="fill"
          objectFit={'cover'}
          objectPosition={'center'}
        />
      ) : (
        <div
          className={
            'bg-[whitesmoke] w-[80%] h-[80%] rounded-[50%] flex justify-center items-center '
          }
        >
          {displayFirstName[0].toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UserAvatarImage;
