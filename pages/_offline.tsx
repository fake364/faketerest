import React from 'react';

import Head from 'next/head';

// eslint-disable-next-line react/display-name
export default () => (
  <>
    <Head>
      <title>Offline</title>
    </Head>
    <h1>This is offline fallback page</h1>
    <h2>When offline, any page route will fallback to this page</h2>
  </>
);
