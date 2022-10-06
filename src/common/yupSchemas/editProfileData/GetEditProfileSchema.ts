import * as yup from 'yup';
import {
  isNameValid,
  isUserNameValid
} from '../../backend/validation-services/registration/functions';
import {
  MAX_LENGTH_FIELDS,
  SPACES_REGEX
} from '../../backend/validation-services/registration/constants';

export const editProfileSchema = yup.object({
  firstName: yup
    .string()
    .max(MAX_LENGTH_FIELDS.firstName)
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
    .max(MAX_LENGTH_FIELDS.lastName)
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
    .max(MAX_LENGTH_FIELDS.username)
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
