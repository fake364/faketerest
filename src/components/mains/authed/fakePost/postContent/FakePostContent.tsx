import React from 'react';
import LimitedRowsText from './expandText/LimitedRowsText';
import UserAvatarImage from '../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import SecondaryButton from '../../../../../common/components/buttons/secondary-button/SecondaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/types';
import PostTopPanel from './postTopPanel/PostTopPanel';
import CommentBlock from './commentBlock/CommentBlock';

type Props = { className?: string };

const FakePostContent: React.FC<Props> = ({ className }) => {
  const authUserId = useSelector((state: RootState) => state.metadata.userId);

  return (
    <div className={className}>
      <PostTopPanel />
      <div>website</div>
      <a target="_blank" href="https://twitter.com/" rel="noopener noreferrer">
        <h1 className={'break-words text-[36px]'}>Long long title lorem</h1>
      </a>

      <div className={'text-[14px] mt-[8px]'}>
        <LimitedRowsText text={'Lorem ipsum'} maxLines={3} />
      </div>
      <div className="flex items-center gap-[12px] mt-[18px]">
        <UserAvatarImage
          firstName={'Valentin'}
          className={'w-[50px] h-[50px]'}
        />
        <span>{'Valentin Serebreanu'}</span>
        {authUserId === 99 && (
          <SecondaryButton className={'justify-self-end ml-[auto]'}>
            Подписаться
          </SecondaryButton>
        )}
      </div>
      <CommentBlock />
    </div>
  );
};

export default FakePostContent;
