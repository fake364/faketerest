import React from 'react';
import useFetchGalleryImages from '../hooks/useFetchGalleryImages';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import styles from '../MainGallery.module.css';
import GalleryFakeItem from '../galleryFakeItem/GalleryFakeItem';
import { mobileCheck } from '../../../../../common/utils/mobileCheck/mobileCheck';
import NothingPosted from './nothingPosted/NothingPosted';
import CircleSpinner, {
  SPINNER_COLORS
} from '../../../../../common/components/spinner/CircleSpinner';

type Props = { fetchFromUserId?: number };

const GalleryGrid: React.FC<Props> = ({ fetchFromUserId }) => {
  const { posts, totalCount, fetchImages, hasBeenFetched } =
    useFetchGalleryImages(fetchFromUserId);

  const isMobile = mobileCheck();
  const mobileColWidth = document.documentElement.clientWidth / 2 - 18;
  const colWidth = isMobile ? mobileColWidth : 236;
  const containerStyles = 'flex justify-center [&>div]:w-full';

  if (!hasBeenFetched) {
    return (
      <div className={containerStyles}>
        <div className={'absolute w-full h-full flex justify-center mt-[64px]'}>
          <CircleSpinner
            color={SPINNER_COLORS.DEFAULT}
            className={'w-[50px] h-[50px]'}
          />
        </div>
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className={containerStyles}>
        <NothingPosted />
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchImages}
        hasMore={posts.length < totalCount}
        loader={'Loading'}
        className={clsx(
          styles.gridInfiniteScroll,
          !isMobile
            ? 'gap-x-[16px] gap-y-[4px] px-[24px]'
            : 'gap-x-[8px] gap-y-[4px] mt-[24px]'
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
