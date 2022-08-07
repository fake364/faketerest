import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainPage from '../src/components/mains/others/baseMain/MainPage';
import RegFormSpinner from '../src/components/mains/others/baseMain/regForm/form/spinner/RegFormSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '../src/redux/types';
import Layout from '../src/components/layout/Layout';
import { useCheckAuth } from '../src/common/hooks/useCheckAuth';
import MainGallery from '../src/components/mains/authed/mainGallery/MainGallery';

export default function Home(props) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const isUserLoading = useSelector(
    (state: RootState) => state.userData.isLoading
  );
  const { isCheckingAuth } = useCheckAuth();

  if (isCheckingAuth || isUserLoading) {
    return <RegFormSpinner />;
  }

  return (
    <>
      <Layout className="h-screen overflow-hidden">
        {isLoggedIn ? <MainGallery /> : <MainPage />}
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'main-page',
        'error-messages',
        'common'
      ]))
    }
  };
}
