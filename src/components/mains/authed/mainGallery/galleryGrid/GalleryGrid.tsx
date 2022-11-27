import React from 'react';
import useFetchGalleryImages from '../hooks/useFetchGalleryImages';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import styles from '../MainGallery.module.css';
import GalleryFakeItem from '../galleryFakeItem/GalleryFakeItem';
import { mobileCheck } from '../../../../../common/utils/mobileCheck/mobileCheck';
import NothingPosted from './nothingPosted/NothingPosted';

type Props = { fetchFromUserId?: number };

const GalleryGrid: React.FC<Props> = ({ fetchFromUserId }) => {
  const { posts, totalCount, fetchImages, hasBeenFetched } =
    useFetchGalleryImages(fetchFromUserId);

  const isMobile = mobileCheck();
  const mobileColWidth = document.documentElement.clientWidth / 2 - 18;
  const colWidth = isMobile ? mobileColWidth : 236;
  return (
    <div className={'flex justify-center [&>div]:w-full'}>
      {hasBeenFetched && totalCount === 0 ? (
        <NothingPosted />
      ) : (
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
      )}
    </div>
  );
};

export default GalleryGrid;
