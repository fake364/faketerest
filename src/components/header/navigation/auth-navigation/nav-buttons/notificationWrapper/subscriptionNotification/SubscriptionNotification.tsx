import React from 'react';
import ButtonDropdownElement from '../../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import Link from 'next/link';
import UserAvatarImage from '../../user-button/user-image/UserAvatarImage';
import CreatedAtLabel from '../../../../../../../common/components/createdAtLabel/CreatedAtLabel';
import { SubscriptionPayload } from 'faketerest-utilities/dist/events/subscription/types';

type Props = { notificationId: string; data: SubscriptionPayload };

const SubscriptionNotification: React.FC<Props> = ({
  notificationId,
  data: { fromFirstname, fromLastname, fromUsername, fromId, createdAt }
}) => {
  return (
    <Link href={'/' + fromUsername}>
      <ButtonDropdownElement onClick={(e) => e.stopPropagation()}>
        <div className={'flex gap-[12px] items-center'}>
          <div>
            <UserAvatarImage
              userId={Number(fromId)}
              firstName={fromFirstname}
              className={'w-[30px] h-[30px]'}
            />
          </div>
          <div>
            {[fromFirstname, fromLastname].join(' ')}{' '}
            <span className={'font-normal'}>
              has just started following you
            </span>{' '}
            <CreatedAtLabel
              createdAt={createdAt}
              className={'font-normal text-[16px] inline ml-[12px] text-[gray]'}
            />
          </div>
        </div>
      </ButtonDropdownElement>
    </Link>
  );
};

export default SubscriptionNotification;
