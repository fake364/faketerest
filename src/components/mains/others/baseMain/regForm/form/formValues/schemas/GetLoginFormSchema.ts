import * as Yup from 'yup';

export const loginFormNames = {
  email: 'email',
  password: 'password'
};

type SchemaTranslations = {
  emailFormat: string;
  emailRequired: string;
  mandatoryField: string;
};

export const getLoginFormSchema = ({
  emailFormat,
  emailRequired,
  mandatoryField
}: SchemaTranslations) =>
  Yup.object().shape({
    [loginFormNames.email]: Yup.string()
      .required(emailRequired)
      .email(emailFormat),
    [loginFormNames.password]: Yup.string().required(mandatoryField)
  });
