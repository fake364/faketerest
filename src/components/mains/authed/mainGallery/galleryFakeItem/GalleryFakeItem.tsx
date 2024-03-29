import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { getImageColSpanByHeight } from '../utils/utils';
import Image from 'next/image';
import styles from './GalleryFakeItem.module.css';
import { getGalleryItemSizes } from './utils/utils';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import DropdownRootElement from '../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import ButtonDropdownElement from '../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import { Nullable } from '../../../../../common/types/common';
import useTranslation from 'next-translate/useTranslation';
import useFakeSnackbar from '../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import { mobileCheck } from '../../../../../common/utils/mobileCheck/mobileCheck';

export type PostDisplayEntity = {
  postId: string;
  title: Nullable<string>;
  description: Nullable<string>;
  sizes: [number, number];
};

type Props = { postDisplayEntity: PostDisplayEntity };

const GalleryFakeItem: React.FC<Props> = ({
  postDisplayEntity: {
    sizes: [width, height],
    postId,
    title
  }
}) => {
  const { t } = useTranslation('common');
  const { width: fixWidth, height: fixHeight } = getGalleryItemSizes(
    width,
    height
  );
  const { addFakeSnack } = useFakeSnackbar();

  const onClickSave = (e) => {
    e.stopPropagation();
  };

  const onDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch('/api/image/' + postId);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = postId + '.jpg';
      a.click();
    } catch (e) {
      addFakeSnack({ text: 'Something went wrong downloading your image' });
    }
  };

  const src = `http://${window.location.host}/static-box/posts/${postId}.jpg`;
  return (
    <Link href={'/fake/' + postId}>
      <div
        className={clsx(
          getImageColSpanByHeight(fixHeight),
          'flex flex-col cursor-zoom-in'
        )}
      >
        <div
          className={clsx(
            styles.imageMenuBlock,
            '[&>.hover-opening-menu]:hidden',
            !mobileCheck() && '[&>.hover-opening-menu]:hover:flex'
          )}
        >
          <Image
            className={'rounded-[24px] min-h-[236px]'}
            loader={() => src}
            src={src}
            width={fixWidth}
            height={fixHeight}
          />
          <div
            className={clsx(styles.blackTransparentBlock, 'hover-opening-menu')}
          >
            <div className={'flex justify-end'}>
              <PrimaryButton
                className={'relative mt-[12px] mr-[12px] h-[40px]'}
                onClick={onClickSave}
              >
                {t('fakePost.save')}
              </PrimaryButton>
            </div>
            <div className={'flex justify-end leading-[normal]'}>
              <DropdownRootElement
                variant={'icon'}
                Icon={BsThreeDots}
                buttonClass={styles.dotsButtonIcon}
                dropdownClass={'z-[10] top-0 right-0'}
              >
                <ButtonDropdownElement onClick={onDownload}>
                  {t('download')}
                </ButtonDropdownElement>
              </DropdownRootElement>
            </div>
          </div>
        </div>
        {title && <div className={styles.fakePostItemTitle}>{title}</div>}
      </div>
    </Link>
  );
};

export default GalleryFakeItem;
