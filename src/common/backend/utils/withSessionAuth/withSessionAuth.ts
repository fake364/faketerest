import { GetServerSideProps } from 'next';
import UserSessionsService from '../../services/usersSessionsService/UserSessionsService';
import cookie from 'cookie';
import { AUTH_SESSION_KEY } from '../../../constants/commons';

const withSessionAuth: (context: GetServerSideProps) => GetServerSideProps =
  (callback) => async (props) => {
    const {
      req: { headers }
    } = props;
      console.log(headers.cookie);
    if (headers.cookie && cookie.parse(headers.cookie)[AUTH_SESSION_KEY]) {
      const isActive = await UserSessionsService.isSessionActive(
        cookie.parse(headers.cookie)[AUTH_SESSION_KEY]
      );
      if (isActive) {
        try {
          return await callback(props);
        } catch (e) {
          console.error(e);
        }
      }
    }

    return {
      redirect: {
        permanent: true,
        destination: '/'
      }
    };
  };

export default withSessionAuth;
