import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { isUserNameValid as isUsernameValidFn } from '../functions';

const USERNAME_ERROR = 'Username has bad format, please stick to the format';

@ValidatorConstraint({ name: 'customText', async: false })
export default class IsUsernameValid implements ValidatorConstraintInterface {
  defaultMessage(): string {
    return USERNAME_ERROR;
  }

  validate(value: string): Promise<boolean> | boolean {
    return isUsernameValidFn(value);
  }
}
