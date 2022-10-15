import React, { useState } from 'react';
import FakeCard from './fakeCard/FakeCard';
import FakePostEntity from '../../../../common/classes/fakePostEntity/FakePostEntity';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import SideButton from './fakeCard/sideIconButton/SideButton';
import { FaImage } from '@react-icons/all-files/fa/FaImage';
import ImagesSideColumn from './fakeCard/imagesSideColumn/ImagesSideColumn';

type Props = {};
type Keys = keyof FakePostEntity;
type FieldChangeValues = FakePostEntity[Keys];
export type PostChangeFunction = (
  id: FakePostEntity['id'],
  name: Keys,
  value: FieldChangeValues
) => void;

const FakeBuilderContainer: React.FC<Props> = () => {
  const [posts, setPosts] = useState<FakePostEntity[]>([new FakePostEntity(0)]);

  const handleChangeCard: PostChangeFunction = (
    id: FakePostEntity['id'],
    name: Keys,
    value: FieldChangeValues
  ) => {
    const index = posts.findIndex(({ id: postId }) => postId === id);
    console.log('found index', index);
    if (index !== -1) {
      const postToChange = posts[index];
      const changedPost = new FakePostEntity(
        postToChange.id,
        postToChange.title,
        postToChange.description,
        postToChange.image
      );
      switch (name) {
        case 'title':
        case 'description':
          if (typeof value === 'string') {
            changedPost[name] = value as string;
          }
          break;
        case 'id':
          if (typeof value === 'number') {
            changedPost[name] = value as number;
          }
          break;
        case 'image':
          changedPost[name] = value as File;
          break;
      }

      setPosts((prev) => {
        const newPrev = [...prev];
        newPrev[index] = changedPost;
        return newPrev;
      });
    }
  };

  const onAddNewPost = () => {
    setPosts((prev) => {
      const id = prev[prev.length - 1].id + 1;
      return [...prev, new FakePostEntity(id)];
    });
  };

  const onRemoveCard = (id: number) => {
    setPosts((prev) => prev.filter(({ id: postId }) => postId === id));
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
          postEntry={post}
          handleChange={handleChangeCard}
          onRemoveCard={onRemoveCard}
        />
      ))}
    </div>
  );
};

export default FakeBuilderContainer;
