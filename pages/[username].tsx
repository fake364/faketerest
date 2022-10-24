import React from 'react';
import Layout from '../src/components/layout/Layout';
import Profile from '../src/components/mains/authed/profile/Profile';
import { AUTH_SESSION_KEY } from '../src/common/constants/commons';
import cookie from 'cookie';
import RegistrationService from '../src/common/backend/services/registrationService/RegistrationService';
import UserSessionsService from '../src/common/backend/services/usersSessionsService/UserSessionsService';

export default function UsernamePage(props) {
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
    if (
      !(await UserSessionsService.isSessionActive(
        cookie.parse(headers.cookie)[AUTH_SESSION_KEY]
      ))
    ) {
      throw new Error('Unauthorized');
    }
    const result = await RegistrationService.getUserDataBy(username);
    if (!result) {
      throw new Error('No user found');
    }
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
