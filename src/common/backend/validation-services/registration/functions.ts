import { NAME_REGEX, USERNAME_REGEX } from './constants';

export const isNameValid = (value?: string) => {
  if (!value) {
    return true;
  }
  return !!value?.trim().match(NAME_REGEX);
};

export const isUserNameValid = (value: string) => {
  if (!value) {
    return true;
  }
  return !!value?.trim().match(USERNAME_REGEX);
};
