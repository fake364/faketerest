import React from 'react';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';
import { useFormik } from 'formik';
import { GENDER_ENUM } from '../../../../../../common/enums/common';
import LabeledDropdown from '../../../../../../common/components/dropdown/labeledDropdown/LabeledDropdown';
import RadioValueGroup from '../../../../../../common/components/inputs/radioValueGroup/RadioValueGroup';
import { CountryObject } from '../../../../../../common/types/common';
import SubmitFooter from '../../submitFooter/SubmitFooter';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../redux/types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { setUserData } from '../../../../../../redux/actions/user-data/actions';

type Props = { userData: UserDataEntity; countries: CountryObject[] };

type State = { gender: GENDER_ENUM; countryCode3?: string };

const PersonalDataForm: React.FC<Props> = ({ userData, countries }) => {
  const state = useSelector((state: RootState) => state);
  const router = useRouter();
  const { t } = useTranslation('settings');
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (values: State) => {
    const submitData = {
      countryCode3: values.countryCode3 || null,
      gender: Number(values.gender)
    };
    await axios.patch(
      '/api/registration/' + state.metadata.userId,
      submitData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    dispatch(setUserData({ ...state.userData.userData, ...submitData }));
    router.reload();
  };

  const formik = useFormik<State>({
    initialValues: {
      gender: userData.gender as GENDER_ENUM,
      countryCode3: userData.countryCode3 || ''
    },
    onSubmit
  });

  const onReset = () => {
    formik.resetForm();
  };

  const {
    values: { gender, countryCode3 }
  } = formik;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <RadioValueGroup
          className={'flex gap-[16px]'}
          radioData={[
            { value: GENDER_ENUM.MALE, label: 'male' },
            { value: GENDER_ENUM.FEMALE, label: 'female' },
            { value: GENDER_ENUM.NOT_SPECIFIED, label: 'notSpecified' }
          ].map(({ value, label }) => ({
            value,
            label: t(`personal-data.radio.${label}`)
          }))}
          selected={gender}
          onChange={(checkedValue) =>
            formik.setFieldValue('gender', checkedValue)
          }
        />
        <div className="mt-[24px]">
          <LabeledDropdown
            title={t('personal-data.country')}
            className={'max-w-[480px]'}
            name={'countryCode3'}
            value={countryCode3}
            onChange={(e) =>
              formik.setFieldValue(e.target.name, e.target.value)
            }
          >
            <option value={''}>Not specified</option>
            {countries.map(({ label, code }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </LabeledDropdown>
        </div>
        <SubmitFooter
          wasFormChanged={formik.dirty}
          onReset={onReset}
          isFormValid={formik.isValid}
          isSubmitting={formik.isSubmitting}
        />
      </form>
    </div>
  );
};

export default PersonalDataForm;
