import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import axios from 'axios';
import { Nullable } from '../../../../common/types/common';
import useFakeSnackbar from '../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import styles from './MainGallery.module.css';
import clsx from 'clsx';
import { getImageColSpanByHeight, POSTS_FETCH_LIMIT } from './utils/utils';
import Link from 'next/link';

type Props = {};

type PostDisplayEntity = {
  postId: string;
  title: Nullable<string>;
  description: Nullable<string>;
  sizes: [number, number];
};

// TODO REFACTOR CODE TO MAKE IT CLEANER

const MainGallery: React.FC<Props> = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [posts, setPosts] = useState<PostDisplayEntity[]>([]);
  const offsetRef = useRef(0);
  const { addFakeSnack } = useFakeSnackbar();

  useEffect(() => {
    if (posts.length === 0) {
      fetchImages();
    }
  }, []);

  useEffect(() => {
    console.log(window.innerHeight, document.body.scrollHeight);
    if (
      window.innerHeight >= document.body.scrollHeight &&
      posts.length !== totalCount
    ) {
      fetchImages();
    }
  }, [posts]);

  const fetchImages = async () => {
    try {
      const result = await axios.get('/api/posts', {
        params: { offset: offsetRef.current, limit: POSTS_FETCH_LIMIT }
      });
      offsetRef.current += POSTS_FETCH_LIMIT;
      console.log(result);
      if (totalCount === 0) {
        setTotalCount(result.data.total);
      }
      setPosts((prev) => [...prev, ...result.data.posts]);
    } catch (e) {
      addFakeSnack({ text: 'There was some error in image fetching' });
    }
  };

  // if (totalCount === 0) {
  //   return <CircleSpinner color={SPINNER_COLORS.DEFAULT} />;
  // }

  return (
    <div className={'flex justify-center [&>div]:w-full'}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchImages}
        hasMore={posts.length < totalCount}
        loader={<h4>Loading...</h4>}
        className={clsx(styles.gridInfiniteScroll, 'gap-x-[16px] gap-y-[4px]')}
      >
        {posts.map(({ postId, sizes: [width, height], title }, index) => {
          const fixWidth = 236;
          let fixHeight = (fixWidth * height) / width;
          if (fixHeight > 419) {
            fixHeight = 419;
          }
          return (
            <Link href={'/fake/' + postId}>
              <div
                className={clsx(
                  getImageColSpanByHeight(fixHeight),
                  'flex flex-col cursor-zoom-in'
                )}
                key={index}
              >
                <Image
                  className={'rounded-[24px] min-h-[236px]'}
                  src={`/posts/${postId}.jpg`}
                  width={fixWidth}
                  height={fixHeight}
                />
                {title && (
                  <div
                    className={
                      'line-clamp-[2] text-ellipsis mt-[8px] font-bold text-[14px] text-[#4d4d4d] pointer-events-none'
                    }
                  >
                    {title}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default MainGallery;
