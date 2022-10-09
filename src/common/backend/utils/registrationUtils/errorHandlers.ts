import { SQL_ERRORS } from '../../sql/constants/constants';

export const handleFieldError = (e, onExists: (fieldName: string) => void) => {
  const err = e?.response?.data?.errors?.[0];
  if (err?.field) {
    err?.status === SQL_ERRORS.USER_ALREADY_EXISTS && onExists(err.field);
  }
};
