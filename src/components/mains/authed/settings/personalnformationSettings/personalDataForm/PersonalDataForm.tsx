import React from 'react';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';
import { useFormik } from 'formik';
import { GENDER_ENUM } from '../../../../../../common/enums/common';
import LabeledDropdown from '../../../../../../common/components/dropdown/labeledDropdown/LabeledDropdown';
import RadioValueGroup from '../../../../../../common/components/inputs/radioValueGroup/RadioValueGroup';
import { PERSONAL_INFO_CHECKBOXES } from '../utils/constants';

type Props = { userData: UserDataEntity };

type State = { gender: GENDER_ENUM; countryCode3?: string };

const PersonalDataForm: React.FC<Props> = ({ userData }) => {
  const onSubmit = (values: State) => {};

  const formik = useFormik<State>({
    initialValues: {
      gender: userData.gender as GENDER_ENUM,
      countryCode3: userData.countryCode3
    },
    onSubmit
  });

  const {
    values: { gender, countryCode3 }
  } = formik;
  return (
    <div>
      <RadioValueGroup
        className={'flex gap-[16px]'}
        radioData={PERSONAL_INFO_CHECKBOXES}
        selected={gender}
        onChange={(checkedValue) =>
          formik.setFieldValue('gender', checkedValue)
        }
      />
      <div className="mt-[24px]">
        <LabeledDropdown title={'Страна/регион'} className={'max-w-[480px]'}>
          <option>Kek</option>
        </LabeledDropdown>
      </div>
    </div>
  );
};

export default PersonalDataForm;
