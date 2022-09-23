import { IsNotEmpty, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import {
  isUserNameValid,
  NAME_REGEX,
  SPACES_REGEX
} from '../../../../yupSchemas/editProfileData/GetEditProfileSchema';
import { MB_3_IN_BYTES } from '../../../../constants/commons';

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
  @ValidateIf(
    (value) =>
      isUserNameValid(value?.toLowerCase()) &&
      !value.toLowerCase().match(SPACES_REGEX)
  )
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @ValidateIf((value: File) => value.size < MB_3_IN_BYTES)
  image?: File;
}
