import React from 'react';
import RegistrationService from '../../../src/common/backend/services/registrationService/RegistrationService';
import GalleryGrid from '../../../src/components/mains/authed/mainGallery/galleryGrid/GalleryGrid';
import Layout from '../../../src/components/layout/Layout';
import useTranslation from 'next-translate/useTranslation';

export default function UserFakesPage({ id }: { id: number }) {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <div className={'flex flex-col gap-[24px] items-center'}>
        <div className={'font-normal text-[24px]'}>{t('allPosts')}</div>
        <div className={'self-stretch'}>
          <GalleryGrid fetchFromUserId={id} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { username } }) {
  const id = await RegistrationService.getUserIdByUsername(username);

  if (id !== null) {
    return {
      props: { id } // will be passed to the page component as props
    };
  } else {
    return {
      notFound: true
    };
  }
}
