import * as yup from 'yup';
import { isPasswordComplexOrEmpty } from '../../backend/validation-services/registration/functions';
export const accountSettingsSchema = yup.object({
  email: yup
    .string()
    .email('This value does not look like email. Please stick to the format'),
  password: yup
    .string()
    .test(
      'passwordTest',
      'Password should be at least 4 characters long',
      (value) => isPasswordComplexOrEmpty(value)
    ),
  confirmPassword: yup
    .string()
    .test('confirmTest', 'Passwords dont match', function (confirm) {
      return this.parent.password === confirm;
    })
});
