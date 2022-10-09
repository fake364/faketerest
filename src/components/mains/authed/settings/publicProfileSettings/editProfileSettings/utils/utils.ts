import axios from 'axios';
import { PublicSettingsFormData } from '../EditProfileForm';
import { SQL_ERRORS } from '../../../../../../../common/backend/sql/constants/constants';

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
