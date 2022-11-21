import getRegFormSchema from './GetRegFormSchema';
import { CreateRegistrationPayload } from '../../../../../../../../common/requests/registration/RegistrationRequests';

export const initializeRegSchema = (errors: (key: string) => string) =>
  getRegFormSchema({
    tooOld: errors('tooOld'),
    tooLittle: errors('negativeAge'),
    mandatoryField: errors('mandatoryField'),
    longPassword: errors('longPassword'),
    shortPassword: errors('shortPassword'),
    emailFormat: errors('emailFormat'),
    emailRequired: errors('requiredEmail'),
    ageNotNumber: errors('ageNotNumber')
  });

export const getInitRegFormValues = (): CreateRegistrationPayload => ({
  email: '',
  password: '',
  age: undefined
});
