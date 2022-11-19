import React from 'react';
import useFetchGalleryImages from '../hooks/useFetchGalleryImages';
import CircleSpinner, {
  SPINNER_COLORS
} from '../../../../../common/components/spinner/CircleSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import styles from '../MainGallery.module.css';
import GalleryFakeItem from '../galleryFakeItem/GalleryFakeItem';

type Props = { fetchFromUserId?: number };

const GalleryGrid: React.FC<Props> = ({ fetchFromUserId }) => {
  const { posts, totalCount, fetchImages } =
    useFetchGalleryImages(fetchFromUserId);

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

export default GalleryGrid;
