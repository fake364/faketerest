import React from 'react';
import { UserData } from '../../../../../common/types/user-types/UserData';
import EditProfileForm from './editProfileSettings/EditProfileForm';
import SecondaryButton from '../../../../../common/components/buttons/secondary-button/SecondaryButton';

type Props = { userData: UserData };

const PublicProfileSettings: React.FC<Props> = ({ userData }) => {
  return (
    <div className="flex flex-col gap-[18px] ">
      <h2 className="font-normal text-[28px]">Общедоступный профиль</h2>
      <p>В вашем профиле можно будет увидеть указанную информацию</p>
      <EditProfileForm userData={userData} />

    </div>
  );
};

export default PublicProfileSettings;
