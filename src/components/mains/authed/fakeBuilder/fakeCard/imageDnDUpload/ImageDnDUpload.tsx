import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ImageDnDUpload.module.css';
import useTranslation from 'next-translate/useTranslation';
import ImageNext from 'next/image';
import DashedIconBlock from './dashedIconBlock/DashedIconBlock';
import { ImBin2 } from '@react-icons/all-files/im/ImBin2';
import CircleIconButton from '../../../../../../common/components/buttons/CircleIconButton';
import { MB_6_IN_BYTES } from '../../../../../../common/constants/commons';

const fileTypes = ['image/apng', 'image/jpeg', 'image/png', 'image/webp'];

export type ImageDnDProps = {
  className?: string;
  onImageDrop: (file: File) => void;
  src?: string;
  error?: string;
};
const ImageDnDUpload: React.FC<ImageDnDProps> = ({
  className,
  onImageDrop,
  src,
  error
}) => {
  const { t } = useTranslation('common');
  const [isDraggingOn, setDragging] = useState<boolean>(false);
  const [formatError, setFormatError] = useState<boolean>(false);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragWithValue = (state: boolean) => () => {
    setDragging(state);
  };

  const loadImageFileAndValidate = (file?: File) => {
    if (file && fileTypes.includes(file.type) && file.size < MB_6_IN_BYTES) {
      setFormatError(false);
      onImageDrop(file);
    } else {
      console.warn('It is not allowed image type');
      setFormatError(true);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dataItem = e.dataTransfer.items[0];
    const file = dataItem?.getAsFile();
    loadImageFileAndValidate(file);
    setDragging(false);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    loadImageFileAndValidate(file);
  };

  const errorString =
    error || (formatError && t('fake-builder.imageFormatError'));
  return (
    <div
      className={clsx(
        styles.imageDnDUploadContainer,
        'relative',
        src ? 'max-h-[230px]' : 'max-h-[454px]',
        className
      )}
    >
      {src ? (
        <div className={'flex flex-col justify-center h-full'}>
          <ImageNext
            src={src}
            layout={'fill'}
            objectFit={'contain'}
            objectPosition={'center'}
            className={'rounded-[8px]'}
          />
          <div>
            <CircleIconButton
              className={
                'relative !z-[4] bg-[white] w-[40px] h-[40px] text-[black]'
              }
              Icon={ImBin2}
              onClick={() => onImageDrop(null)}
            />
          </div>
        </div>
      ) : (
        <>
          <DashedIconBlock error={errorString}>
            {errorString || t('fake-builder.drag-image')}
          </DashedIconBlock>
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
      {(isDraggingOn || errorString) && (
        <div
          className={clsx(
            styles.fullSizeAbsoluteBlock,
            styles.draggedOnBlock,
            errorString ? styles.errorColors : styles.dragColors,
            'z-[1]'
          )}
        />
      )}
    </div>
  );
};

export default ImageDnDUpload;
