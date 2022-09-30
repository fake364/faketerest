import React, { ChangeEventHandler } from 'react';
import clsx from 'clsx';
import styles from '../../../../profile/Profile.module.css';
import SecondaryButton from '../../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import useTranslation from 'next-translate/useTranslation';
import UserAvatarImage from '../../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';

type Props = {
  firstName: string;
  onChangeFile: ChangeEventHandler<HTMLInputElement>;
};

const ChangeProfilePhoto: React.FC<Props> = ({ firstName, onChangeFile }) => {
  const { t } = useTranslation('settings');

  const triggerFileInput = () => {
    document.getElementById('upload_image').click();
  };

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="text-[14px] text-[gray]">{t('photo')}</div>
      <div className="flex gap-[18px]">
        <UserAvatarImage
          className={clsx(
            styles.roundedButton,
            'w-[75px] h-[75px]',
            'text-[32px] relative'
          )}
          firstName={firstName}
        />
        <div className="flex items-center">
          <input
            type="file"
            hidden
            id="upload_image"
            onChange={onChangeFile}
            accept="image/jpeg, image/png"
          />
          <SecondaryButton onClick={triggerFileInput}>
            {t('change')}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePhoto;
