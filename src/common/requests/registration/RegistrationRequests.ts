import axios from 'axios';
import { regFormNames } from '../../../components/mains/others/baseMain/regForm/form/formValues/schemas/GetRegFormSchema';

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

const RegistrationRequests = { createRegistration, isEmailExists };

export default RegistrationRequests;
