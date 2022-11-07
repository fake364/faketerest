import React from 'react';
import { SubscriptionNotificationPayload } from '../../../../../../../redux/types/types';
import ButtonDropdownElement from '../../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import Link from 'next/link';
import UserAvatarImage from '../../user-button/user-image/UserAvatarImage';

type Props = { notificationId: string; data: SubscriptionNotificationPayload };

const SubscriptionNotification: React.FC<Props> = ({
  notificationId,
  data: { fromFirstname, fromLastname, fromUsername, fromId }
}) => {
  return (
    <Link href={'/' + fromUsername}>
      <ButtonDropdownElement onClick={(e) => e.stopPropagation()}>
        <div className={'flex gap-[12px] items-center'}>
          <UserAvatarImage
            userId={Number(fromId)}
            firstName={fromFirstname}
            className={'w-[30px] h-[30px]'}
          />
          <div>
            {[fromFirstname, fromLastname].join(' ')} <span className={'font-normal'}>has just started following
              you</span>
          </div>
        </div>
      </ButtonDropdownElement>
    </Link>
  );
};

export default SubscriptionNotification;
