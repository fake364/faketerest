import React from 'react';
import Layout from '../../src/components/layout/Layout';
import FakePost from '../../src/components/mains/authed/fakePost/FakePost';
import { getImageBase64UrlById } from '../../src/common/backend/utils/fakePosts/utils';
import FakePostsService from '../../src/common/backend/services/fakePostsService/FakePostsService';

export type FakePostPageProps = {
  imageBase64Url: string;
  author: {
    id: number;
    firstName: string;
    lastName?: string;
    username: string;
  };
  title?: string;
  description?: string;
};

export default function Post(props: FakePostPageProps) {
  return (
    <Layout>
      <FakePost {...props} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { postid } }) {
  const imageDataUrl = getImageBase64UrlById(postid);
  let postData;
  try {
    postData = await FakePostsService.getPost(postid);
    console.log(postData);
  } catch (e) {
    console.error('Could not find post', e);
    postData = null;
  }
  if (!imageDataUrl || !postData) {
    return { notFound: true };
  }
  return {
    props: { imageBase64Url: imageDataUrl, ...postData } // will be passed to the page component as props
  };
}
