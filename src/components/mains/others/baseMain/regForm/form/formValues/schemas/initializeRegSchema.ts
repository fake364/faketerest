import getRegFormSchema, { regFormNames } from './GetRegFormSchema';

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

export const getInitRegFormValues = () => ({
  [regFormNames.email]: '',
  [regFormNames.password]: '',
  [regFormNames.age]: undefined
});


