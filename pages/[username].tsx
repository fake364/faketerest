import React from 'react';
import axios from 'axios';
import { UserData } from '../src/common/types/user-types/UserData';
import { StatusCodes } from 'http-status-codes';
import Layout from '../src/components/layout/Layout';
import Profile from '../src/components/mains/authed/profile/Profile';

export default function UsernamePage(props) {
  console.log('Got props', props);
  return (
    <Layout>
      <Profile userData={props} />
    </Layout>
  );
}

export async function getServerSideProps({
  params: { username },
  req: { headers },
  ...rest
}) {
  try {
    const result = await axios.get<UserData>(
      'http://localhost:3000/api/registration/' + username,
      {
        withCredentials: true,
        headers: {
          Cookie: headers.cookie || ''
        }
      }
    );
    console.log(result);
    return { props: { ...result.data } };
  } catch (e) {
    if (e?.response?.status === StatusCodes.UNAUTHORIZED) {
      return {
        redirect: {
          permanent: true,
          destination: '/'
        }
      };
    }
    console.error(e);
    return { notFound: true };
  }
}
