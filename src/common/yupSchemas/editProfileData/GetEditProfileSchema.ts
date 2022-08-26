import * as yup from 'yup';

const NAME_REGEX =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

const USERNAME_REGEX = /^([a-z0-9]+[.-]?[a-z0-9]+)+$/;

const isNameValid = (value: string) => !!value.match(NAME_REGEX);

const isUserNameValid = (value: string) => !!value.match(USERNAME_REGEX);

export const editProfileSchema = yup.object({
  firstName: yup
    .string()
    .max(126)
    .test(
      'firstname-test',
      'Looks like first name does not match format(Letters and space,",",".","' +
        '.","-" allowed)',
      isNameValid
    ),
  lastName: yup
    .string()
    .max(126)
    .test(
      'lastname-test',
      'Looks like last name does not match format(Letters and space and:",","' +
        '.","-" allowed)',
      isNameValid
    )
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
});
