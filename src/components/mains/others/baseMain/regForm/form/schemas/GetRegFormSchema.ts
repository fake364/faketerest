import * as Yup from 'yup';

export const regFormNames = {
  email: 'email',
  password: 'password',
  age: 'age'
};

type SchemaTranslations = {
  emailFormat: string;
  emailRequired: string;
  shortPassword: string;
  longPassword: string;
  mandatoryField: string;
  tooLittle: string;
  tooOld: string;
  ageNotNumber: string;
};

const getRegFormSchema = ({
  emailFormat,
  emailRequired,
  shortPassword,
  longPassword,
  mandatoryField,
  tooLittle,
  tooOld,
  ageNotNumber
}: SchemaTranslations) =>
  Yup.object().shape({
    [regFormNames.email]: Yup.string()
      .required(emailRequired)
      .email(emailFormat),
    [regFormNames.password]: Yup.string()
      .required(mandatoryField)
      .min(4, shortPassword)
      .max(255, longPassword),
    [regFormNames.age]: Yup.number()
      .typeError(ageNotNumber)
      .required(mandatoryField)
      .min(0, tooLittle)
      .max(150, tooOld)
  });

export default getRegFormSchema;
