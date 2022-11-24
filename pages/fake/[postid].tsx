import React from 'react';
import Layout from '../../src/components/layout/Layout';
import FakePost from '../../src/components/mains/authed/fakePost/FakePost';
import { getImageBase64UrlById } from '../../src/common/backend/utils/fakePosts/utils';
import FakePostsService from '../../src/common/backend/services/fakePostsService/FakePostsService';
import PostsCommentsService from '../../src/common/backend/services/postsCommentsService/PostsCommentsService';
import { mobileCheck } from '../../src/common/utils/mobileCheck/mobileCheck';
import CircleIconButton from '../../src/common/components/buttons/CircleIconButton';
import { FaChevronLeft } from '@react-icons/all-files/fa/FaChevronLeft';
import PostTopPanel from '../../src/components/mains/authed/fakePost/postContent/postTopPanel/PostTopPanel';
import { useRouter } from 'next/router';

export type CommentInstance = {
  firstName: string;
  lastName?: string;
  postId: string;
  text: string;
  userId: number;
  username: string;
  createDate: string;
};

export type AuthorData = {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
};

export type FakePostPageProps = {
  imageBase64Url: string;
  author: AuthorData;
  title?: string;
  description?: string;
  comments: CommentInstance[];
};

export default function Post(props: FakePostPageProps) {
  const isMobile = mobileCheck();
  const router = useRouter();

  if (isMobile) {
    const onBack = async () => {
      await router.back();
    };

    return (
      <div>
        <div className={'sticky w-full bg-[white] p-[8px] flex'}>
          <CircleIconButton
            className={' w-[45px] h-[45px] !text-[22px]'}
            Icon={FaChevronLeft}
            onClick={onBack}
          />
          <PostTopPanel className={'flex-1'} />
        </div>
        <FakePost {...props} />
      </div>
    );
  }

  return (
    <Layout>
      <FakePost {...props} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { postid } }) {
  const imageDataUrl = getImageBase64UrlById(postid);
  let postData;
  let comments;
  try {
    postData = await FakePostsService.getPost(postid);
  } catch (e) {
    console.error('Could not find post', e);
    postData = null;
  }
  try {
    comments = await PostsCommentsService.getCommentsByPostId(postid);
  } catch (e) {
    console.error('Comments error', e);
  }
  if (!imageDataUrl || !postData || !comments) {
    return { notFound: true };
  }
  return {
    props: { imageBase64Url: imageDataUrl, ...postData, comments }
  };
}
