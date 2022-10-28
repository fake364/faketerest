import React from 'react';
import { PostDisplayEntity } from '../MainGallery';
import Link from 'next/link';
import clsx from 'clsx';
import { getImageColSpanByHeight } from '../utils/utils';
import Image from 'next/image';
import styles from './GalleryFakeItem.module.css';
import { getGalleryItemSizes } from './utils/utils';

type Props = { postDisplayEntity: PostDisplayEntity };

const GalleryFakeItem: React.FC<Props> = ({
  postDisplayEntity: {
    sizes: [width, height],
    postId,
    title
  }
}) => {
  const { width: fixWidth, height: fixHeight } = getGalleryItemSizes(
    width,
    height
  );
  return (
    <Link href={'/fake/' + postId}>
      <div
        className={clsx(
          getImageColSpanByHeight(fixHeight),
          'flex flex-col cursor-zoom-in'
        )}
      >
        <Image
          className={'rounded-[24px] min-h-[236px]'}
          src={`/posts/${postId}.jpg`}
          width={fixWidth}
          height={fixHeight}
        />
        {title && <div className={styles.fakePostItemTitle}>{title}</div>}
      </div>
    </Link>
  );
};

export default GalleryFakeItem;
