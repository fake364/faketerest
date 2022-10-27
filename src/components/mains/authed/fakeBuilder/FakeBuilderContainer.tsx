import React, { useEffect } from 'react';
import FakeCard from './fakeCard/FakeCard';
import FakePostEntity from '../../../../common/classes/fakePostEntity/FakePostEntity';
import ImagesSideColumn from './fakeCard/imagesSideColumn/ImagesSideColumn';
import clsx from 'clsx';
import { RootState } from '../../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderMode } from '../../../../redux/actions/metadata/actions';
import { HEADER_MODE } from '../../../layout/Layout';
import {
  resetPosts,
  setFakePosts,
  submitPostsById
} from '../../../../redux/actions/fake-builder/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type Props = {};
export type PostFieldKeys = keyof FakePostEntity;
export type FieldChangeValues = FakePostEntity[PostFieldKeys];
export type PostChangeFunction = (
  id: FakePostEntity['id'],
  name: PostFieldKeys,
  value: FieldChangeValues
) => void;

const FakeBuilderContainer: React.FC<Props> = () => {
  const posts = useSelector((state: RootState) => state.fakePosts.posts);
  const dispatch: ThunkDispatch<RootState, {}, AnyAction> = useDispatch();

  const isSelectionEnabled = posts.some(({ isSelected }) => isSelected);

  useEffect(() => {
    if (isSelectionEnabled) {
      dispatch(setHeaderMode(HEADER_MODE.FAKE_BUILDER));
    } else {
      dispatch(setHeaderMode(HEADER_MODE.DEFAULT));
    }
  }, [isSelectionEnabled]);

  useEffect(() => {
    return () => {
      dispatch(resetPosts());
    };
  }, []);

  const onAddNewPost = () => {
    const id = (posts[posts.length - 1]?.id || 0) + 1;
    dispatch(setFakePosts([...posts, new FakePostEntity(id)]));
  };

  const onRemoveCard = (id: number) => {
    if (posts.length > 1) {
      dispatch(setFakePosts(posts.filter(({ id: postId }) => postId !== id)));
    }
  };

  const shouldDisplaySelect = posts.length !== 1;
  return (
    <div
      className={'overflow-y-scroll fixed h-[-webkit-fill-available] w-full'}
    >
      <ImagesSideColumn
        className={'fixed left-0'}
        onClickPlus={onAddNewPost}
        isSelectionEnabled={isSelectionEnabled}
      />
      <div
        className={clsx(
          isSelectionEnabled && 'scale-50 origin-top h-[50%]',
          'transition-all duration-500',
          'flex flex-col items-center z-[-1]'
        )}
      >
        {posts.map((post: FakePostEntity) => (
          <FakeCard
            key={post.id}
            postEntry={post}
            onRemoveCard={onRemoveCard}
            onSubmit={() => dispatch(submitPostsById([post.id]))}
            isSelectionEnabled={isSelectionEnabled}
            shouldDisplaySelect={shouldDisplaySelect && !post.uploadId}
          />
        ))}
      </div>
    </div>
  );
};

export default FakeBuilderContainer;
