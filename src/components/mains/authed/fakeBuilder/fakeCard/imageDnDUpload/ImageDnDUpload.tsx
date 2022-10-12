import React from 'react';
import clsx from 'clsx';
import styles from './ImageDnDUpload.module.css';
import { RiArrowUpCircleFill } from '@react-icons/all-files/ri/RiArrowUpCircleFill';

type Props = { className?: string };
const ImageDnDUpload: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx(styles.imageDnDUploadContainer, className)}>
      <div className={styles.dashedUpload}>
        <RiArrowUpCircleFill className={'text-[32px] text-[#767676]'} />
        <div className="text-[#111]">
          Перетащите изображение или нажмите кнопку для загрузки
        </div>
      </div>
      <div className="m-[32px] text-center text-[12px] font-[400] text-[#111]">
        Советуем использовать файлы высокого качества в формате .jpg (размером
        меньше 20МБ)
      </div>
    </div>
  );
};

export default ImageDnDUpload;
