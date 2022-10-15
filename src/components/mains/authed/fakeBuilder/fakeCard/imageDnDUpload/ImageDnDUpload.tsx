import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './ImageDnDUpload.module.css';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { RiArrowUpCircleFill } from '@react-icons/all-files/ri/RiArrowUpCircleFill';

const fileTypes = ['image/apng', 'image/jpeg', 'image/png', 'image/webp'];

export type ImageDnDProps = {
  className?: string;
  onImageDrop: (file: File) => void;
  src?: string;
};
const ImageDnDUpload: React.FC<ImageDnDProps> = ({
  className,
  onImageDrop,
  src
}) => {
  const { t } = useTranslation('common');
  const [isDraggingOn, setDragging] = useState<boolean>(false);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragWithValue = (state: boolean) => () => {
    setDragging(state);
  };

  const onDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dataItem = e.dataTransfer.items[0];
    if (dataItem && fileTypes.includes(dataItem.type)) {
      onImageDrop(dataItem.getAsFile());
    } else {
      console.warn('It is not allowed image type');
    }
    setDragging(false);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (fileTypes.includes(file.type)) {
      onImageDrop(e.target.files[0]);
    } else {
      console.warn('It is not allowed image type');
    }
  };

  return (
    <div
      className={clsx(styles.imageDnDUploadContainer, 'relative', className)}
    >
      {src ? (
        <Image
          src={src}
          layout={'fill'}
          objectFit={'cover'}
          objectPosition={'center'}
          className={'rounded-[8px]'}
        />
      ) : (
        <>
          <div className={clsx(styles.dashedUpload)}>
            <RiArrowUpCircleFill className={'text-[32px] text-[#767676]'} />
            <div className="text-[#111]">{t('fake-builder.drag-image')}</div>
          </div>
          <div className="m-[32px] text-center text-[12px] font-[400] text-[#111]">
            {t('fake-builder.recommend-using-jpg')}
          </div>
        </>
      )}
      <input
        type={'file'}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragWithValue(true)}
        onDragLeave={onDragWithValue(false)}
        className={clsx(
          styles.fullSizeAbsoluteBlock,
          'opacity-0 z-[2] cursor-pointer'
        )}
        onChange={onChangeHandler}
      />
      {isDraggingOn && (
        <div
          className={clsx(
            styles.fullSizeAbsoluteBlock,
            styles.draggedOnBlock,
            'z-[1]'
          )}
        />
      )}
    </div>
  );
};

export default ImageDnDUpload;
