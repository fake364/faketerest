import React from 'react';
import LimitedRowsText from './expandText/LimitedRowsText';
import UserAvatarImage from '../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import SecondaryButton from '../../../../../common/components/buttons/secondary-button/SecondaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/types';
import PostTopPanel from './postTopPanel/PostTopPanel';
import CommentBlock from './commentBlock/CommentBlock';
import { FakePostPageProps } from '../../../../../../pages/fake/[postid]';
import Link from 'next/link';

type Props = { className?: string } & Pick<
  FakePostPageProps,
  'title' | 'author' | 'description' | 'comments'
>;

const FakePostContent: React.FC<Props> = ({
  className,
  description,
  title,
  author: {
    id: authorId,
    lastName: authorLastName,
    firstName: authorFirstName,
    username
  },
  comments
}) => {
  const authUserId = useSelector((state: RootState) => state.metadata.userId);

  return (
    <div className={className}>
      <PostTopPanel />
      {/*<div>website</div>*/}
      {title && (
        <a
          target="_blank"
          href="https://twitter.com/"
          rel="noopener noreferrer"
        >
          <h1 className={'break-words text-[36px]'}>{title}</h1>
        </a>
      )}

      {description && (
        <div className={'text-[14px] mt-[8px]'}>
          <LimitedRowsText text={description} maxLines={3} />
        </div>
      )}
      <div className="flex items-center gap-[12px] mt-[18px]">
        <Link href={'/' + username}>
          <div className={'flex items-center gap-[12px] cursor-pointer'}>
            <UserAvatarImage
              firstName={authorFirstName}
              userId={authorId}
              className={'w-[50px] h-[50px]'}
            />
            <span>{[authorFirstName, authorLastName].join(' ')}</span>
          </div>
        </Link>
        {authUserId !== authorId && (
          <SecondaryButton className={'justify-self-end ml-[auto]'}>
            Подписаться
          </SecondaryButton>
        )}
      </div>
      <CommentBlock comments={comments} />
    </div>
  );
};

export default FakePostContent;
