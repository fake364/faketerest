import React from 'react';
import FakePostContent from './postContent/FakePostContent';
import { useRouter } from 'next/router';
import PostImageContainer from './postImageContainer/PostImageContainer';

type Props = { imageBase64Url: string };

const FakePost: React.FC<Props> = ({ imageBase64Url }) => {
  const router = useRouter();
  const { postid } = router.query;
  console.log('postid', postid);

  return (
    <div className="w-full flex justify-center">
      <div
        className={
          'rounded-[20px] shadow-md flex max-w-[1016px] bg-[white] w-full'
        }
      >
        <div className="flex-1 flex justify-center">
          <PostImageContainer imageBase64Url={imageBase64Url} />
        </div>
        <FakePostContent className={'flex flex-col w-[508px] px-[26px] py-[18px]'} />
      </div>
    </div>
  );
};

export default FakePost;
