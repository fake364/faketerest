import axios from 'axios';
import { PublicSettingsFormData } from '../EditProfileForm';
import { SQL_ERRORS } from '../../../../../../../common/backend/sql/constants/constants';
import { FORM_ERRORS_KEYS } from '../../../../../../../common/enums/common';

export const submitProfileSettings = async (
  id,
  values: PublicSettingsFormData
) => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => formData.append(key, value));
  return new Promise((resolve, reject) => {
    axios
      .patch('/api/registration/' + id, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
        resolve({});
      })
      .catch((e) => reject(e));
  });
};

export const getErrorsKeysArray = (e) => {
  const errorsResult: string[] = [];
  const backendErrors = e?.response?.data?.errors;
  backendErrors?.forEach((errObj) => {
    if (errObj?.field && errObj?.status === SQL_ERRORS.USER_ALREADY_EXISTS) {
      errorsResult.push(FORM_ERRORS_KEYS.EXISTING_FIELD);
    } else {
      errorsResult.push(...Object.keys(errObj));
    }
  });
  return errorsResult;
};
