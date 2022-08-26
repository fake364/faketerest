import React from 'react';
import Layout from '../src/components/layout/Layout';
import Profile from '../src/components/mains/authed/profile/Profile';
import RegistrationService from '../src/common/backend/services/RegistrationService';
import { jwtCheck } from '../src/common/backend/utils/middlewares';
import { AUTH_TOKEN_COOKIE_KEY } from '../src/common/constants/commons';
import cookie from 'cookie';

export default function UsernamePage(props) {
  console.log('Got props', props);
  return (
    <Layout>
      <Profile userData={props} />
    </Layout>
  );
}

export const getServerSideProps = async ({
  params: { username },
  req: { headers }
}) => {
  try {
    await jwtCheck(cookie.parse(headers.cookie)[AUTH_TOKEN_COOKIE_KEY]);
    const result = await RegistrationService.getUserDataBy(username);
    return { props: { ...result } };
  } catch (e) {
    return {
      redirect: {
        permanent: true,
        destination: '/'
      }
    };
  }
};
