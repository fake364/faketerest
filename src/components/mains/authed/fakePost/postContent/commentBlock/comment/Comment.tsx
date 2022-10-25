import React from 'react';
import UserAvatarImage from '../../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import Link from 'next/link';
import { getDifferenceWithCode, msToTime } from './utils/utils';

type Props = {
  userId: number;
  firstName: string;
  username: string;
  createDate: string;
  text: string;
};

const Comment: React.FC<Props> = ({
  firstName,
  username,
  userId,
  text,
  createDate
}) => {
  const dateDifference = getDifferenceWithCode(createDate);

  console.log('parsed', dateDifference);
  return (
    <div className={'flex gap-[8px]'}>
      <Link href={'/' + username}>
        <UserAvatarImage
          userId={userId}
          firstName={firstName}
          className={'w-[40px] h-[40px]'}
        />
      </Link>
      <div className={'flex-1 mt-[4px] flex flex-col'}>
        <div>
          <Link href={'/' + username}>
            <span
              className={'font-bold hover:underline cursor-pointer mr-[8px]'}
            >
              {username}
            </span>
          </Link>
          {text}
        </div>
        <div>
          <div className={'text-[gray] text-[14px]'}>{`${dateDifference[1]} ${dateDifference[0]}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
