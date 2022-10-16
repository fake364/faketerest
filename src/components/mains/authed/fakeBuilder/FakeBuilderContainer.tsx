import React, { useState } from 'react';
import FakeCard from './fakeCard/FakeCard';
import FakePostEntity from '../../../../common/classes/fakePostEntity/FakePostEntity';
import ImagesSideColumn from './fakeCard/imagesSideColumn/ImagesSideColumn';
import { changePostByName, mapIdToPostEntries } from './fakeCard/utils/utils';
import { validate } from 'class-validator';

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
    let wasFail = false;
    for (const post of posts) {
      const result = await validate(post);
      if (result.length > 0) {
        wasFail = true;
      }
      handleChangeCard(post.id, 'errors', result);
    }

    if (!wasFail) {
      // SUBMIT SUCCESS
      return;
    }
    // SUBMIT fail
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

  console.log('posts', posts);
  return (
    <div className="fixed h-[-webkit-fill-available] w-full overflow-y-scroll flex flex-col items-center z-[-1]">
      <ImagesSideColumn
        posts={posts}
        className={'fixed left-0'}
        onClickPlus={onAddNewPost}
      />
      {posts.map((post) => (
        <FakeCard
          key={post.id}
          postEntry={post}
          handleChange={handleChangeCard}
          onRemoveCard={onRemoveCard}
          onSubmit={() => submitForms([post.id])}
        />
      ))}
    </div>
  );
};

export default FakeBuilderContainer;
