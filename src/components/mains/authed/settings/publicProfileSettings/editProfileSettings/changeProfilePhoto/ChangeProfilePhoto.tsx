import React from 'react';
import clsx from 'clsx';
import styles from '../../../../profile/Profile.module.css';
import SecondaryButton from '../../../../../../../common/components/buttons/secondary-button/SecondaryButton';

type Props = { firstName: string };

const ChangeProfilePhoto: React.FC<Props> = ({ firstName }) => {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="text-[14px] text-[gray]">Фотография</div>
      <div className="flex gap-[18px]">
        <div
          className={clsx(
            styles.roundedButton,
            'w-[75px] h-[75px]',
            'text-[32px]'
          )}
        >
          {firstName[0].toUpperCase()}
        </div>
        <div className="flex items-center">
          <SecondaryButton>Изменить</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePhoto;
