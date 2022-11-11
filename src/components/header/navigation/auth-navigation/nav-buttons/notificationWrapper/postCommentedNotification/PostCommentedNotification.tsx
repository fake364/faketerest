import React from 'react';
import ButtonDropdownElement from '../../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import Link from 'next/link';
import { PostCommentedPayload } from 'faketerest-utilities/dist/events/comment/types';
import CreatedAtLabel from '../../../../../../../common/components/createdAtLabel/CreatedAtLabel';
import getFirstLastName from '../../../../../../../common/utils/firstLastNameCreate/getFirstLastName';
import UserAvatarImage from '../../user-button/user-image/UserAvatarImage';

type Props = { data: PostCommentedPayload };

const PostCommentedNotification: React.FC<Props> = ({
  data: { postId, fromFirstname, fromLastname, createdAt, text, fromUserId }
}) => {
  return (
    <Link href={'/fake/' + postId}>
      <ButtonDropdownElement onClick={(e) => e.stopPropagation()}>
        <div className={'flex gap-[12px]'}>
          <div>
            <UserAvatarImage
              userId={fromUserId}
              firstName={fromFirstname}
              className={'w-[30px] h-[30px]'}
            />
          </div>
          <div>
            {getFirstLastName(fromFirstname, fromLastname)} has left comment
            under your post:{' '}
            <span className={'font-normal line-clamp-2'}>{text}</span>
            <CreatedAtLabel
              createdAt={createdAt}
              className={'font-normal text-[16px] text-[gray]'}
            />
          </div>
        </div>
      </ButtonDropdownElement>
    </Link>
  );
};

export default PostCommentedNotification;
