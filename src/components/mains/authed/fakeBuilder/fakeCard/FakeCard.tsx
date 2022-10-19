import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import FakePostEntity from '../../../../../common/classes/fakePostEntity/FakePostEntity';
import { PostChangeFunction } from '../FakeBuilderContainer';
import PostImageForm from './postImageForm/PostImageForm';
import UploadSuccess from './uploadSuccess/UploadSuccess';

type Props = {
  className?: string;
  postEntry: FakePostEntity;
  handleChange: PostChangeFunction;
  onRemoveCard: (id: number) => void;
  onSubmit: () => void;
};

const FakeCard: React.FC<Props> = ({
  className,
  handleChange,
  postEntry,
  onRemoveCard,
  onSubmit
}) => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (postEntry.image) {
      const fr = new FileReader();
      fr.onload = function () {
        setImageUrl(fr.result as string);
      };
      fr.readAsDataURL(postEntry.image);
    } else {
      setImageUrl(null);
    }
  }, [postEntry.image]);

  const onRemove = () => onRemoveCard(postEntry.id);

  return (
    <div
      className={clsx(
        'bg-[white] rounded-[16px]  w-[880px] mt-[32px] relative',
        postEntry.uploadId ? 'px-[32px] py-[18px]' : 'px-[62px] py-[36px]',
        className
      )}
    >
      {postEntry.uploadId ? (
        <UploadSuccess
          imageUrl={imageUrl}
          postId={postEntry.uploadId}
          onRemove={onRemove}
        />
      ) : (
        <PostImageForm
          postEntry={postEntry}
          handleChange={handleChange}
          onSubmit={onSubmit}
          onRemove={onRemove}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default FakeCard;
