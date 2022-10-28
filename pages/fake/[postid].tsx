import React from 'react';
import Layout from '../../src/components/layout/Layout';
import FakePost from '../../src/components/mains/authed/fakePost/FakePost';
import { getImageBase64UrlById } from '../../src/common/backend/utils/fakePosts/utils';
import FakePostsService from '../../src/common/backend/services/fakePostsService/FakePostsService';
import PostsCommentsService from '../../src/common/backend/services/postsCommentsService/PostsCommentsService';

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
  console.log(props);
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
    console.log(postData);
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
