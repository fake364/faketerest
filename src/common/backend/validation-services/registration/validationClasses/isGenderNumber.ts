import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

const GENDER_NUMBER_ERROR =
  'Your number should be {-1, 0, 1}. But given incorrect instead';

@ValidatorConstraint({ name: 'customText', async: false })
export default class IsGenderNumber implements ValidatorConstraintInterface {
  defaultMessage(): string {
    return GENDER_NUMBER_ERROR;
  }

  validate(value: number): Promise<boolean> | boolean {
    return value === -1 || value === 0 || value === -1;
  }
}
