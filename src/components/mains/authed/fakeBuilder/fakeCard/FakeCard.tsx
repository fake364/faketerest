import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import FakePostEntity from '../../../../../common/classes/fakePostEntity/FakePostEntity';
import { PostChangeFunction } from '../FakeBuilderContainer';
import PostImageForm from './postImageForm/PostImageForm';
import UploadSuccess from './uploadSuccess/UploadSuccess';
import SelectButton from './selectButton/SelectButton';
import { AppDispatch } from '../../../../../redux/types';
import { useDispatch } from 'react-redux';
import { changePostFieldById } from '../../../../../redux/actions/fake-builder/actions';

type Props = {
  className?: string;
  postEntry: FakePostEntity;
  onRemoveCard: (id: number) => void;
  onSubmit: () => void;
  isSelectionEnabled: boolean;
  shouldDisplaySelect?: boolean;
};

const FakeCard: React.FC<Props> = ({
  className,
  postEntry,
  onRemoveCard,
  onSubmit,
  isSelectionEnabled,
  shouldDisplaySelect = false
}) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const dispatch: AppDispatch = useDispatch();

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

  const onSelect = () => {
    dispatch(
      changePostFieldById(postEntry.id, 'isSelected', !postEntry.isSelected)
    );
  };

  return (
    <div
      className={clsx(
        'bg-[white] rounded-[16px]  w-[880px] mt-[32px] relative',
        postEntry.uploadId ? 'px-[32px] py-[18px]' : 'px-[62px] py-[36px]',
        className
      )}
    >
      {isSelectionEnabled && (
        <div
          className={clsx(
            'border-[2px] left-0 top-0 absolute z-[5]',
            'rounded-[16px] w-full h-full bg-[rgba(255,255,255,0.5)]',
            'cursor-pointer',
            postEntry.isSelected && 'border-[#E60023]'
          )}
          onClick={onSelect}
        />
      )}
      {shouldDisplaySelect && (
        <SelectButton
          isSelected={postEntry.isSelected}
          isSelectionEnabled={isSelectionEnabled}
          onSelect={onSelect}
        />
      )}
      {postEntry.uploadId ? (
        <UploadSuccess
          imageUrl={imageUrl}
          postId={postEntry.uploadId}
          onRemove={onRemove}
        />
      ) : (
        <PostImageForm
          postEntry={postEntry}
          onSubmit={onSubmit}
          onRemove={onRemove}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default FakeCard;
