import UserDataEntity from '../../../validation-services/registration/UserDataEntity';

export type DatabaseSearchUser = {
  full_text: string;
  ID: string;
  FIRST_NAME: string;
};

export type SearchUserPayload = {
  fullText: string;
  id: UserDataEntity['id'];
};
