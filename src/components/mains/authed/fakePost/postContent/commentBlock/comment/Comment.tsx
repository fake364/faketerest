import React from 'react';
import UserAvatarImage from '../../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import Link from 'next/link';
import CreatedAtLabel from '../../../../../../../common/components/createdAtLabel/CreatedAtLabel';

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
  return (
    <div className={'flex gap-[8px]'}>
      <Link href={'/' + username}>
        <UserAvatarImage
          userId={userId}
          firstName={firstName}
          className={'w-[40px] h-[40px]'}
        />
      </Link>
      <div className={'flex-1 mt-[4px] flex flex-col break-all'}>
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
          <CreatedAtLabel
            createdAt={createDate}
            className={'text-[gray] text-[14px]'}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
