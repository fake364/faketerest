import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Nullable } from '../../../../common/types/common';
import styles from './MainGallery.module.css';
import clsx from 'clsx';
import CircleSpinner, {
  SPINNER_COLORS
} from '../../../../common/components/spinner/CircleSpinner';
import GalleryFakeItem from './galleryFakeItem/GalleryFakeItem';
import useFetchGalleryImages from './hooks/useFetchGalleryImages';

type Props = {};

export type PostDisplayEntity = {
  postId: string;
  title: Nullable<string>;
  description: Nullable<string>;
  sizes: [number, number];
};


const MainGallery: React.FC<Props> = () => {
  const { posts, totalCount, fetchImages } = useFetchGalleryImages();

  const loadingMoreJSX = (
    <div className={'fixed bottom-0 m-auto right-0 left-0'}>
      <CircleSpinner
        className={'w-[50px] h-[50px]'}
        color={SPINNER_COLORS.DEFAULT}
      />
    </div>
  );

  return (
    <div className={'flex justify-center [&>div]:w-full'}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchImages}
        hasMore={posts.length < totalCount}
        loader={loadingMoreJSX}
        className={clsx(styles.gridInfiniteScroll, 'gap-x-[16px] gap-y-[4px]')}
      >
        {posts.map((post, index) => (
          <GalleryFakeItem postDisplayEntity={post} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MainGallery;
