import React, { useState } from 'react';
import clsx from 'clsx';
import CircleIconButton from '../../../../../../common/components/buttons/CircleIconButton';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import UserAvatarImage from '../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import ExtendableInput from '../../../fakeBuilder/fakeCard/fakeAddForm/input/extendableInput/ExtendableInput';
import outlineStyles from '../../../../../../common/utilityCss/Outline.module.css';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';

type Props = { className?: string };

const CommentBlock: React.FC<Props> = ({ className }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [commentValue, setComment] = useState('');

  const toggleComments = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleChangeComment = (value) => {
    setComment(value);
  };

  return (
    <div className={clsx(className, 'flex flex-col')}>
      <div
        className={
          'mt-[24px] text-[20px] font-[400] flex gap-[12px] items-center'
        }
      >
        <span>{12} комментариев</span>
        <CircleIconButton
          className={'text-[black]'}
          Icon={isExpanded ? FaChevronDown : FaChevronRight}
          onClick={toggleComments}
        />
      </div>
      {isExpanded && (
        <>
          <div>Comments</div>
          <div className="flex gap-[12px] mt-[18px]">
            <UserAvatarImage className={'w-[50px] h-[50px]'} />
            <ExtendableInput
              containerClass={'flex-1'}
              className={clsx(
                'w-full py-[12px] px-[12px] rounded-[16px] border-[1px] border-[#d4d5d6] border-solid',
                outlineStyles.defaultFocusOutline
              )}
              placeholder={'Добавить комментарий'}
              placeholderClassName={'ml-[12px]'}
              value={commentValue}
              onChange={handleChangeComment}
            />
          </div>
          <div className={'flex justify-end mt-[12px] gap-[12px] pb-[12px]'}>
            <SecondaryButton>Отмена</SecondaryButton>
            <SecondaryButton>Готово</SecondaryButton>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentBlock;
