import React from 'react';
import Tooltip from '../../../../../../common/components/tooltip/Tooltip';
import { UserData } from '../../../../../../common/types/user-types/UserData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import Link from 'next/link';
import styles from './UserRoundButton.module.css';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import UserAvatarImage from './user-image/UserAvatarImage';
import clsx from 'clsx';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';

type Props = {};

const UserRoundButton: React.FC<Props> = () => {
  const userData: UserDataEntity | undefined = useSelector(
    (state: RootState) => state.userData.userData
  );
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <Tooltip
      text={t('header.tooltips.profile')}
      className={
        router.query?.username === userData?.username && 'pointer-events-none'
      }
    >
      <Link href={'/' + userData?.username}>
        <div className={clsx(styles.roundButton, '!w-[48px]')}>
          <UserAvatarImage
            firstName={userData.firstName}
            className={clsx('w-[28px]', 'h-[28px]')}
          />
        </div>
      </Link>
    </Tooltip>
  );
};

export default UserRoundButton;
