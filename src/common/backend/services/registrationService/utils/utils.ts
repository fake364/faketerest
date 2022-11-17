import { DatabaseSearchUser } from '../types/types';

export const isSearchUserEntry = (obj: unknown): obj is DatabaseSearchUser => {
  const user = obj as DatabaseSearchUser;
  return typeof user.ID === 'string';
};

export const areSearchUsersEntries = (
  entries: unknown[]
): entries is DatabaseSearchUser[] => {
  return entries.every((entry) => isSearchUserEntry(entry));
};
