import React from 'react';
import MainPage from '../src/components/mains/others/baseMain/MainPage';
import RegFormSpinner from '../src/components/mains/others/baseMain/regForm/form/spinner/RegFormSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '../src/redux/types';
import Layout from '../src/components/layout/Layout';
import MainGallery from '../src/components/mains/authed/mainGallery/MainGallery';

export default function Home(props) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const isUserLoading = useSelector(
    (state: RootState) => state.userData.isLoading
  );

  if (isUserLoading) {
    return <RegFormSpinner />;
  }

  return (
    <>
      <Layout className="">
        {isLoggedIn ? <MainGallery /> : <MainPage />}
      </Layout>
    </>
  );
}

