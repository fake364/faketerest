import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/types';
import FakePostEntity from '../../../../common/classes/fakePostEntity/FakePostEntity';
import SecondaryButton from '../../../../common/components/buttons/secondary-button/SecondaryButton';
import {
  resetPosts,
  setFakePosts,
  submitPostsById
} from '../../../../redux/actions/fake-builder/actions';
import CircleIconButton from '../../../../common/components/buttons/CircleIconButton';
import { ImBin2 } from '@react-icons/all-files/im/ImBin2';
import PrimaryButton from '../../../../common/components/buttons/primary-button/PrimaryButton';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type Props = {};

const FakeBuilderHeader: React.FC<Props> = () => {
  const posts: FakePostEntity[] = useSelector(
    (state: RootState) => state.fakePosts.posts
  );
  const dispatch: ThunkDispatch<RootState, {}, AnyAction> = useDispatch();
  const areAllPostsSelected = posts.every(({ isSelected }) => isSelected);

  const flagAllPostsSelection = (flag: boolean) => () => {
    posts.forEach((post) => {
      post.isSelected = flag;
    });
    const newPosts = [...posts];
    dispatch(setFakePosts(newPosts));
  };

  const resetAllPosts = () => {
    dispatch(resetPosts());
  };

  const submitAll = () => {
    const ids = posts
      .filter(({ isSelected }) => isSelected)
      .map(({ id }) => id);
    dispatch(submitPostsById(ids));
  };

  return (
    <nav className="sticky py-[24px] px-[12px] flex flex-stretch gap-[14px] z-[10] flex justify-between">
      <div className="flex items-center gap-[12px]">
        <div
          className={
            'ml-[18px] pr-[18px] py-[4px]  border-r-[1px] border-[#d6d6d6] border-solid'
          }
        >
          Выбрано {posts.length} поста
        </div>
        <SecondaryButton
          onClick={flagAllPostsSelection(!areAllPostsSelected)}
          className={'!bg-[white] hover:!bg-[whitesmoke]'}
        >
          {areAllPostsSelected ? 'Отменить выбор' : 'Выбрать все'}
        </SecondaryButton>
      </div>
      <div className="flex gap-[18px]">
        <CircleIconButton
          className={'!text-[18px]'}
          Icon={ImBin2}
          onClick={resetAllPosts}
        />
        <PrimaryButton onClick={submitAll}>Опубликовать</PrimaryButton>
        <div className="pl-[18px] border-l-[1px] border-solid border-[#d6d6d6]">
          <CircleIconButton
            className={'!text-[18px]'}
            Icon={FaTimes}
            onClick={resetAllPosts}
          />
        </div>
      </div>
    </nav>
  );
};

export default FakeBuilderHeader;
