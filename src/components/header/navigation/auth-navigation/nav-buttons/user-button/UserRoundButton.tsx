import React from 'react';
import Tooltip from '../../../../../../common/components/tooltip/Tooltip';
import { UserData } from '../../../../../../common/types/user-types/UserData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import Link from 'next/link';
import styles from './UserRoundButton.module.css';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

type Props = {};

const UserRoundButton: React.FC<Props> = () => {
  const userData: UserData | undefined = useSelector(
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
      {userData?.email && (
        <Link href={'/' + userData?.username}>
          <div className={styles.roundButton}>
            <div className="bg-[#f0f0f0] rounded-[50%] px-[10px] py-[3px]">
              {userData?.firstName[0].toUpperCase()}
            </div>
          </div>
        </Link>
      )}
    </Tooltip>
  );
};

export default UserRoundButton;
