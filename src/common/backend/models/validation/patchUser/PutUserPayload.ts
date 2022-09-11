import { IsNotEmpty, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import {
  isUserNameValid,
  NAME_REGEX,
  SPACES_REGEX,
} from '../../../../yupSchemas/editProfileData/GetEditProfileSchema';

export default class PutUserPayload {
  @ValidateIf(
    (value) =>
      value.trim().match(NAME_REGEX) && value.trim().match(SPACES_REGEX)
  )
  @Min(1)
  @Max(126)
  firstName: string;

  @Max(126)
  @ValidateIf((value) => value.trim().match(NAME_REGEX))
  @IsOptional()
  @Min(1)
  lastName?: string;

  @Max(64)
  @ValidateIf((value)=>isUserNameValid(value?.toLowerCase()) && !value.toLowerCase().match(SPACES_REGEX))
  @IsNotEmpty()
  username:string;
}
