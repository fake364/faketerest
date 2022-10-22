import React from 'react';
import Layout from '../../src/components/layout/Layout';
import FakePost from '../../src/components/mains/authed/fakePost/FakePost';
import * as fs from 'fs';
import * as path from 'path';

export default function Post({ imageUrl: imageBase64Url }) {
  return (
    <Layout>
      <FakePost imageBase64Url={imageBase64Url} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { postid } }) {
  console.log(postid);
  const uintArr = fs.readFileSync(
    path.join('public', 'posts', `${postid}.jpg`)
  );
  const base64EncodedImage = uintArr.toString('base64');
  const mimeType = 'image/jpg';
  return {
    props: { imageBase64Url: `data:${mimeType};base64,${base64EncodedImage}` } // will be passed to the page component as props
  };
}
