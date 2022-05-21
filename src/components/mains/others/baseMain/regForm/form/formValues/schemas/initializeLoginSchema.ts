import { regFormNames } from './GetRegFormSchema';
import { getLoginFormSchema } from './GetLoginFormSchema';

export const initializeLoginSchema = (errors: (key: string) => string) =>
  getLoginFormSchema({
    mandatoryField: errors('mandatoryField'),
    emailFormat: errors('emailFormat'),
    emailRequired: errors('requiredEmail')
  });

export const getInitLoginFormValues = () => ({
  [regFormNames.email]: '',
  [regFormNames.password]: ''
});
