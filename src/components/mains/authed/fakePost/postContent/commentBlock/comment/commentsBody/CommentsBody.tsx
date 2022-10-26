import React, { useState } from 'react';
import Comment from '../Comment';
import UserAvatarImage from '../../../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import ExtendableInput from '../../../../../fakeBuilder/fakeCard/fakeAddForm/input/extendableInput/ExtendableInput';
import clsx from 'clsx';
import outlineStyles from '../../../../../../../../common/utilityCss/Outline.module.css';
import { decodeHtml } from '../utils/utils';
import SecondaryButton from '../../../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import { CommentInstance } from '../../../../../../../../../pages/fake/[postid]';

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

  return (
    <>
      <div className={'flex flex-col gap-[8px]'}>
        {comments
          .slice(0, showCommentsNum)
          .map(({ text, username, userId, firstName, createDate }) => (
            <Comment
              userId={userId}
              firstName={firstName}
              username={username}
              createDate={createDate}
              text={text}
            />
          ))}
        {showCommentsNum < comments.length && (
          <SecondaryButton onClick={onClickShowMore}>
            Показать больше
          </SecondaryButton>
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
          placeholder={'Добавить комментарий'}
          placeholderClassName={'ml-[12px]'}
          value={commentValue}
          onChange={(value) => handleChangeComment(decodeHtml(value))}
          onClick={onClickInput}
        />
      </div>
      {isInputFocused && (
        <div className={'flex justify-end mt-[12px] gap-[12px] pb-[12px]'}>
          <SecondaryButton onClick={onCancelCommenting}>Отмена</SecondaryButton>
          <SecondaryButton
            className={clsx(
              (!commentValue.trim() || isSubmitting) &&
                'pointer-events-none !text-[gray]'
            )}
            onClick={onSubmitComment}
          >
            Готово
          </SecondaryButton>
        </div>
      )}
    </>
  );
};

export default CommentsBody;
