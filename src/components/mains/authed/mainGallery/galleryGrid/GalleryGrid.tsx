import React from 'react';
import useFetchGalleryImages from '../hooks/useFetchGalleryImages';
import CircleSpinner, {
  SPINNER_COLORS
} from '../../../../../common/components/spinner/CircleSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import styles from '../MainGallery.module.css';
import GalleryFakeItem from '../galleryFakeItem/GalleryFakeItem';
import { mobileCheck } from '../../../../../common/utils/mobileCheck/mobileCheck';

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

  const isMobile = mobileCheck();
  const mobileColWidth = document.documentElement.clientWidth / 2 - 18;
  const colWidth = isMobile ? mobileColWidth : 236;
  return (
    <div className={'flex justify-center [&>div]:w-full'}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchImages}
        hasMore={posts.length < totalCount}
        loader={loadingMoreJSX}
        className={clsx(
          styles.gridInfiniteScroll,
          !isMobile
            ? 'gap-x-[16px] gap-y-[4px] px-[24px]'
            : 'gap-x-[8px] gap-y-[4px]'
        )}
        style={{
          gridAutoColumns: colWidth,
          gridTemplateColumns: `repeat(auto-fit, ${colWidth}px)`
        }}
      >
        {posts.map((post, index) => (
          <GalleryFakeItem postDisplayEntity={post} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default GalleryGrid;
