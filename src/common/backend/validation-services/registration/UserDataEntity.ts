import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Validate
} from 'class-validator';
import { MAX_LENGTH_FIELDS } from './constants';
import { EMAIL_REGEX } from '../../../constants/commons';
import IsNameValid from './validationClasses/IsNameValid';
import IsUsernameValid from './validationClasses/IsUsernameValid';
import IsGenderNumber from './validationClasses/isGenderNumber';

export default class UserDataEntity {
  @IsOptional()
  @IsString()
  @MaxLength(MAX_LENGTH_FIELDS.firstName)
  @IsNotEmpty()
  @Validate(IsNameValid)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_LENGTH_FIELDS.lastName)
  @Validate(IsNameValid)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_LENGTH_FIELDS.username)
  @Validate(IsUsernameValid)
  username: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  age?: number;

  @IsOptional()
  @IsString()
  @Matches(EMAIL_REGEX, { message: 'email does not look like email' })
  email: string;

  @IsOptional()
  @IsNumber()
  @Validate(IsGenderNumber)
  gender: number;

  @IsOptional()
  @IsString()
  countryCode3?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
