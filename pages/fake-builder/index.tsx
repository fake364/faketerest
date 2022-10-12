import Layout from '../../src/components/layout/Layout';
import React, { useEffect } from 'react';
import FakeBuilderContainer from '../../src/components/mains/authed/fakeBuilder/FakeBuilderContainer';

export default function FakeBuilderPage(props) {
  useEffect(() => {
    const element = document.querySelector('body');
    const grayBackground = 'bg-[#E9E9E9]';
    element.classList.add(grayBackground);
    return () => {
      element.classList.remove(grayBackground);
    };
  }, []);

  return (
    <Layout>
      <FakeBuilderContainer />
    </Layout>
  );
}
