import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';

type Props = { className?: string; firstName: string };

const UserAvatarImage: React.FC<Props> = ({ firstName, className }) => {
  const id = useSelector((state: RootState) => state.metadata.userId);
  const [isImageShown, setImageShown] = useState<boolean>(true);

  return (
    <div className={clsx('relative','flex justify-center items-center', className)}>
      {isImageShown ? (
        <Image
          src={'/user/' + id + '/avatar.png'}
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
        firstName[0].toUpperCase()
      )}
    </div>
  );
};

export default UserAvatarImage;
