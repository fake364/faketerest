import React from 'react';
import FakePostContent from './postContent/FakePostContent';
import { useRouter } from 'next/router';
import PostImageContainer from './postImageContainer/PostImageContainer';
import { FakePostPageProps } from '../../../../../pages/fake/[postid]';
import styles from './FakePost.module.css';
import clsx from 'clsx';

type Props = FakePostPageProps;

const FakePost: React.FC<Props> = ({ imageBase64Url, ...rest }) => {
  const router = useRouter();
  const { postid } = router.query;

  return (
    <div className="w-full flex justify-center">
      <div
        className={clsx(
          'rounded-[20px] flex max-w-[1016px] bg-[white] w-full',
          styles.elevationShadow
        )}
      >
        <div className="flex-1 flex justify-center">
          <PostImageContainer imageBase64Url={imageBase64Url} />
        </div>
        <FakePostContent
          className={'flex flex-col w-[508px] px-[26px] py-[18px]'}
          {...rest}
          postId={postid as string}
        />
      </div>
    </div>
  );
};

export default FakePost;
