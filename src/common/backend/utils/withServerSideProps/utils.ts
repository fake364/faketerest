import { jwtCheck } from '../middlewares';
import cookie from 'cookie';
import { AUTH_TOKEN_COOKIE_KEY } from '../../../constants/commons';
import RegistrationService from '../../services/registrationService/RegistrationService';

export const mapUserDataWithJWTCheck = async (cookies: string) => {
  try {
    const userId = await jwtCheck(cookie.parse(cookies)[AUTH_TOKEN_COOKIE_KEY]);
    const result = await RegistrationService.getUserDataBy(userId);
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
