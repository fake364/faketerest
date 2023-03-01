import React, { useState } from 'react';
import clsx from 'clsx';
import CircleIconButton from '../../../../../../common/components/buttons/CircleIconButton';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import { CommentInstance } from '../../../../../../../pages/fake/[postid]';
import { useRouter } from 'next/router';
import axios from 'axios';
import CommentEntity from '../../../../../../common/classes/commentEntity/CommentEntity';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import CommentsBody from './comment/commentsBody/CommentsBody';
import useFakeSnackbar from '../../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  className?: string;
  comments: CommentInstance[];
  postId: string;
};

const CommentBlock: React.FC<Props> = ({ className, comments, postId }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [commentValue, setComment] = useState('');
  const myUserId = useSelector((state: RootState) => state.metadata.userId);
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation('common');
  const { addFakeSnack } = useFakeSnackbar();

  const toggleComments = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleChangeComment = (value) => {
    console.log('SET VALUE', value);
    setComment(value);
  };

  const onSubmitComment = async () => {
    if (commentValue) {
      setSubmitting(true);
      try {
        await axios.post('/api/post/comment', {
          postId,
          text: commentValue,
          userId: myUserId
        } as CommentEntity);
        await router.replace(router.asPath, undefined, { scroll: false });
        setComment('');
        addFakeSnack({ text: t('fakePost.commentHasBeenAdded') });
      } catch (e) {
        addFakeSnack({ text: t('fakePost.errorAddingComment') });
        console.error('Error creating comment', e);
      }
      setSubmitting(false);
    }//....
  };

  return (
    <div className={clsx(className, 'flex flex-col')}>
      <div
        className={
          'mt-[24px] text-[20px] font-[400] flex gap-[12px] items-center'
        }
      >
        <span>{t('fakePost.comment', { count: comments.length })}</span>
        <CircleIconButton
          className={'text-[black]'}
          Icon={isExpanded ? FaChevronDown : FaChevronRight}
          onClick={toggleComments}
        />
      </div>
      {isExpanded && (
        <CommentsBody
          comments={comments}
          onSubmitComment={onSubmitComment}
          isSubmitting={isSubmitting}
          handleChangeComment={handleChangeComment}
          commentValue={commentValue}
        />
      )}
    </div>
  );
};

export default CommentBlock;
