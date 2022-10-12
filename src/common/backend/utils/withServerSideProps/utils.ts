import cookie from 'cookie';
import { AUTH_SESSION_KEY } from '../../../constants/commons';
import RegistrationService from '../../services/registrationService/RegistrationService';
import UserSessionsService from '../../services/usersSessionsService/UserSessionsService';

export const mapUserDataWithJWTCheck = async (cookies: string) => {
  try {
    const userId = await UserSessionsService.getUserIdBySessionUUid(
      cookie.parse(cookies)[AUTH_SESSION_KEY]
    );
    const result = await RegistrationService.getUserDataBy(userId);
    if (!result) {
      throw new Error('No user found');
    }
    return { props: { userData: { ...result } } };
  } catch (e) {
    return {
      redirect: {
        permanent: true,
        destination: '/'
      }
    };
  }
};
