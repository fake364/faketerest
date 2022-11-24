import React from 'react';
import FakePostContent from './postContent/FakePostContent';
import { useRouter } from 'next/router';
import PostImageContainer from './postImageContainer/PostImageContainer';
import { FakePostPageProps } from '../../../../../pages/fake/[postid]';
import styles from './FakePost.module.css';
import clsx from 'clsx';
import { mobileCheck } from '../../../../common/utils/mobileCheck/mobileCheck';

type Props = FakePostPageProps;

const FakePost: React.FC<Props> = ({ imageBase64Url, ...rest }) => {
  const router = useRouter();
  const { postid } = router.query;
  const isMobile = mobileCheck();

  return (
    <div className={clsx('w-full flex justify-center')}>
      <div
        className={clsx(
          'rounded-[20px] flex bg-[white] w-full',
          isMobile ? 'flex-col' : 'max-w-[1016px] ' + styles.elevationShadow
        )}
      >
        <div className="flex-1 flex justify-center">
          <PostImageContainer imageBase64Url={imageBase64Url} />
        </div>
        <FakePostContent
          className={clsx(
            'flex flex-col  px-[26px] py-[18px]',
            isMobile ? '' : 'w-[508px]'
          )}
          {...rest}
          postId={postid as string}
        />
      </div>
    </div>
  );
};

export default FakePost;
