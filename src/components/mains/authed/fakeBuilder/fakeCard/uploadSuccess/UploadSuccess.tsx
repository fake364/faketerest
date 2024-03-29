import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { FaTimesCircle } from '@react-icons/all-files/fa/FaTimesCircle';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  imageUrl: string;
  postId: string;
  onRemove: () => void;
  title?: string;
};

const UploadSuccess: React.FC<Props> = ({
  imageUrl,
  postId,
  onRemove,
  title
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="flex justify-between items-center">
      <div className={'flex items-center gap-[24px]'}>
        <div className="relative w-[64px] h-[64px] left-0">
          <Image
            src={imageUrl}
            layout={'fill'}
            objectFit={'cover'}
            objectPosition={'center'}
            className={'rounded-[8px]'}
          />
        </div>
        <div className={'text-[#767676] text-[20px] flex flex-col'}>
          <div>{title?.trim() || t('noTitle')}</div>
          <div className={'text-[12px] text-[black]'}>
            {t('postPublished')}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <a href={'/fake/' + postId} target="_blank" rel="noopener noreferrer">
          <SecondaryButton>{t('view')}</SecondaryButton>
        </a>
        <div
          className={
            'text-[22px] [&:hover>#check]:hidden [&:hover>#times]:block p-[8px]'
          }
        >
          <FaCheckCircle id={'check'} className={'text-[#005F3E]'} />
          <FaTimesCircle
            id={'times'}
            className={'hidden cursor-pointer'}
            onClick={onRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadSuccess;
