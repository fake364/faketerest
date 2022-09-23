import * as yup from 'yup';

export const NAME_REGEX =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

export const USERNAME_REGEX = /^([a-z0-9]+[.-]?[a-z0-9]+)+$/;

export const SPACES_REGEX = /^(\S+$)/g;

const isNameValid = (value?: string) =>
  !!(value === undefined || value === null || value.trim().match(NAME_REGEX));

export const isUserNameValid = (value: string) =>
  !!value?.trim().match(USERNAME_REGEX);

export const editProfileSchema = yup.object({
  firstName: yup
    .string()
    .max(126)
    .test(
      'firstname-test',
      'Looks like first name does not match format(Letters and space,",",".","' +
        '.","-" allowed)',
      isNameValid
    )
    .matches(SPACES_REGEX, '* This field cannot contain only blankspaces')
    .required(),
  lastName: yup
    .string()
    .max(126)
    .test(
      'lastname-test',
      'Looks like last name does not match format(Letters and space and:",","' +
        '.","-" allowed)',
      isNameValid
    )
    .matches(SPACES_REGEX, '* This field cannot contain only blankspaces')
    .nullable(),
  username: yup
    .string()
    .max(64)
    .transform((value) => value.toLowerCase())
    .test(
      'username-test',
      'Username should contain only letters, numbers and some symbols(-.)',
      isUserNameValid
    )
    .matches(SPACES_REGEX, '* This field cannot contain only blankspaces')
    .required(),
  image: yup.object().nullable()
});
