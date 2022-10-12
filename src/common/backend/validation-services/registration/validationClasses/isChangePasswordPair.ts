import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

const PASSWORD_PAIR_ERROR =
  'It should be defined both new password and current';

@ValidatorConstraint({ name: 'notSpecifiedBothPasswordFields', async: false })
export default class IsChangePasswordPair
  implements ValidatorConstraintInterface
{
  defaultMessage(): string {
    return PASSWORD_PAIR_ERROR;
  }

  validate(value: string, val): Promise<boolean> | boolean {
    return !!(val?.object?.password && val?.object?.currentPassword);
  }
}
