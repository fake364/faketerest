import React, { useEffect, useState } from 'react';
import FakeCard from './fakeCard/FakeCard';
import FakePostEntity from '../../../../common/classes/fakePostEntity/FakePostEntity';
import ImagesSideColumn from './fakeCard/imagesSideColumn/ImagesSideColumn';
import {
  changePostByName,
  convertPostToFormData,
  mapIdToPostEntries
} from './fakeCard/utils/utils';
import { validate } from 'class-validator';
import axios from 'axios';
import clsx from 'clsx';

type Props = {};
export type PostFieldKeys = keyof FakePostEntity;
export type FieldChangeValues = FakePostEntity[PostFieldKeys];
export type PostChangeFunction = (
  id: FakePostEntity['id'],
  name: PostFieldKeys,
  value: FieldChangeValues
) => void;

const FakeBuilderContainer: React.FC<Props> = () => {
  const [posts, setPosts] = useState<FakePostEntity[]>([new FakePostEntity(0)]);

  const isSelectionEnabled = posts.some(({ isSelected }) => isSelected);

  const handleChangeCard: PostChangeFunction = (
    id: FakePostEntity['id'],
    name: PostFieldKeys,
    value: FieldChangeValues
  ) => {
    const index = posts.findIndex(({ id: postId }) => postId === id);
    if (index !== -1) {
      setPosts((prev) => {
        const newPrev = [...prev];
        newPrev[index] = changePostByName(prev[index], name, value);
        return newPrev;
      });
    }
  };

  const submitForms = async (ids: number[]) => {
    const postsToCreate = mapIdToPostEntries(ids, posts);
    const validPosts: FakePostEntity[] = [];
    for (const post of postsToCreate) {
      const result = await validate(post);
      if (result.length === 0) {
        validPosts.push(post);
      }
      handleChangeCard(post.id, 'errors', result);
    }
    if (validPosts.length > 0) {
      await submitValidForms(validPosts);
    }
  };

  const submitValidForms = async (posts: FakePostEntity[]) => {
    for (const [id, formData] of posts.map(convertPostToFormData)) {
      handleChangeCard(id, 'isLoading', true);
      const res = await axios('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      });
      handleChangeCard(id, 'isLoading', false);
      handleChangeCard(id, 'uploadId', res?.data?.postId);
    }
  };

  const onAddNewPost = () => {
    setPosts((prev) => {
      const id = (prev[prev.length - 1]?.id || 0) + 1;
      return [...prev, new FakePostEntity(id)];
    });
  };

  const onRemoveCard = (id: number) => {
    if (posts.length > 1) {
      setPosts((prev) => prev.filter(({ id: postId }) => postId !== id));
    }
  };

  const shouldDisplaySelect = posts.length !== 1;
  return (
    <div
      className={'overflow-y-scroll fixed h-[-webkit-fill-available] w-full'}
    >
      <ImagesSideColumn
        posts={posts}
        className={'fixed left-0'}
        onClickPlus={onAddNewPost}
        handleChange={handleChangeCard}
      />
      <div
        className={clsx(
          isSelectionEnabled && 'scale-50 origin-top h-[50%]',
          'transition-all duration-500',
          'flex flex-col items-center z-[-1]'
        )}
      >
        {posts.map((post) => (
          <FakeCard
            key={post.id}
            postEntry={post}
            handleChange={handleChangeCard}
            onRemoveCard={onRemoveCard}
            onSubmit={() => submitForms([post.id])}
            isSelectionEnabled={isSelectionEnabled}
            shouldDisplaySelect={shouldDisplaySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default FakeBuilderContainer;
