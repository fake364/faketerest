import axios from 'axios';
import { regFormNames } from '../../../components/mains/others/baseMain/regForm/form/formValues/schemas/GetRegFormSchema';
import { loginFormNames } from '../../../components/mains/others/baseMain/regForm/form/formValues/schemas/GetLoginFormSchema';

export type CreateRegistrationPayload = {
  password: string;
  age?: number;
  email: string;
};

const createRegistration = async ({
  password,
  age,
  email
}: CreateRegistrationPayload) =>
  await axios('/api/registration/create', {
    responseType: 'json',
    method: 'POST',
    data: {
      [regFormNames.password]: password,
      [regFormNames.age]: age,
      [regFormNames.email]: email
    }
  });

const isEmailExists = async (email: string) => {
  try {
    await axios.get('/api/registration/checkEmail', {
      params: { email }
    });
    return true;
  } catch (e) {
    return false;
  }
};

const loginRequest = ({
  password,
  email
}: {
  password: string;
  email: string;
}) => {
  return axios('/api/login', {
    responseType: 'json',
    method: 'POST',
    data: {
      [loginFormNames.password]: password,
      [loginFormNames.email]: email
    }
  });
};

const RegistrationRequests = {
  createRegistration,
  isEmailExists,
  loginRequest
};

export default RegistrationRequests;
