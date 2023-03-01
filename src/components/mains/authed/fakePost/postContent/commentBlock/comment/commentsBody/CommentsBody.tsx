import React, { useState } from 'react';
import Comment from '../Comment';
import UserAvatarImage from '../../../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import ExtendableInput from '../../../../../fakeBuilder/fakeCard/fakeAddForm/input/extendableInput/ExtendableInput';
import clsx from 'clsx';
import outlineStyles from '../../../../../../../../common/utilityCss/Outline.module.css';
import { decodeHtml } from '../utils/utils';
import SecondaryButton from '../../../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import { CommentInstance } from '../../../../../../../../../pages/fake/[postid]';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  comments: CommentInstance[];
  onSubmitComment: () => void;
  isSubmitting: boolean;
  handleChangeComment: (value: string) => void;
  commentValue: string;
};

const CommentsBody: React.FC<Props> = ({
  comments,
  onSubmitComment,
  isSubmitting,
  handleChangeComment,
  commentValue
}) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [showCommentsNum, setCommentsNum] = useState(3);
  const { t } = useTranslation('common');

  const onClickInput = () => {
    setInputFocused(true);
  };

  const onCancelCommenting = () => {
    handleChangeComment('');
    setInputFocused(false);
  };

  const onClickShowMore = () => {
    setCommentsNum((prev) => prev + 3);
  };

  const onEnterCommentInput = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      const parent = event.currentTarget.parentNode;
      await onSubmitComment();
      parent.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const showCommentsIndex = comments.length - showCommentsNum;
  const displayedComments =
    showCommentsIndex >= 0 ? comments.slice(showCommentsIndex) : comments;

  return (
    <>
      <div className={'flex flex-col gap-[8px]'}>
        {showCommentsNum < comments.length && (
          <SecondaryButton onClick={onClickShowMore}>
            {t('fakePost.showMore')}({showCommentsIndex})
          </SecondaryButton>
        )}
        {displayedComments.map(
          ({ text, username, userId, firstName, createDate }) => (
            <Comment
              userId={userId}
              firstName={firstName}
              username={username}
              createDate={createDate}
              text={text}
            />
          )
        )}
      </div>
      <div className="flex gap-[12px] mt-[18px]">
        <UserAvatarImage className={'w-[50px] h-[50px]'} />
        <ExtendableInput
          containerClass={'flex-1'}
          className={clsx(
            'w-full py-[12px] px-[12px] rounded-[16px] border-[1px] border-[#d4d5d6] border-solid',
            outlineStyles.defaultFocusOutline,
            isSubmitting && '!bg-[whitesmoke] pointer-events-none'
          )}
          placeholder={t('fakePost.addComment')}
          placeholderClassName={'ml-[12px]'}
          value={commentValue}
          onChange={handleChangeComment}
          onClick={onClickInput}
          onKeyDown={onEnterCommentInput}
        />
      </div>
      {isInputFocused && (
        <div className={'flex justify-end mt-[12px] gap-[12px] pb-[12px]'}>
          <SecondaryButton onClick={onCancelCommenting}>
            {t('fakePost.cancel')}
          </SecondaryButton>
          <SecondaryButton
            className={clsx(
              (!commentValue.trim() || isSubmitting) &&
                'pointer-events-none !text-[gray]'
            )}
            onClick={onSubmitComment}
          >
            {t('fakePost.postCommentButton')}
          </SecondaryButton>
        </div>
      )}
    </>
  );
};

export default CommentsBody;
