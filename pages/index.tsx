import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainPage from '../src/components/mains/others/baseMain/MainPage';
import RegFormSpinner from '../src/components/mains/others/baseMain/regForm/form/spinner/RegFormSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '../src/redux/types';
import Layout from '../src/components/layout/Layout';
import { useCheckAuth } from '../src/common/hooks/useCheckAuth';

export default function Home(props) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const { isCheckingAuth } = useCheckAuth();

  if (isCheckingAuth) {
    return <RegFormSpinner />;
  }

  return (
    <>
      <Layout className="h-screen overflow-hidden">
        {isLoggedIn ? <div>Logged page</div> : <MainPage />}
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const glob = require('glob');
  const allEntries = glob.sync('public/images/main-slider/dinnerIdea/*.jpeg');

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'main-page',
        'error-messages',
        'common'
      ])),
      images: allEntries
    }
  };
}
