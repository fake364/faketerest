import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { isNameValid as isNameValidFn } from '../functions';

const NAME_ERROR =
  'Name format is invalid, there are some unexpected characters';

@ValidatorConstraint({ name: 'customText', async: false })
export default class IsNameValid implements ValidatorConstraintInterface {
  defaultMessage(): string {
    return NAME_ERROR;
  }

  validate(value: string): Promise<boolean> | boolean {
    return isNameValidFn(value);
  }
}
