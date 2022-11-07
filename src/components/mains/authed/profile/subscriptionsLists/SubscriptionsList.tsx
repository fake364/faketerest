import React from 'react';
import { SubscriptionEntry } from '../../../../../../pages/[username]';
import SubscriptionItem from './subscriptionItem/SubscriptionItem';

export enum SUBSCRIPTION_TYPE {
  SUBSCRIPTION,
  SUBSCRIBER
}

type Props = {
  list: SubscriptionEntry[];
  title: string;
  type: SUBSCRIPTION_TYPE;
};

const SubscriptionsList: React.FC<Props> = ({ list, title, type }) => {
  return (
    <div className={'flex flex-col items-center w-[552px] p-[24px]'}>
      <div className={'text-[24px] mt-[12px] mb-[24px] font-medium'}>
        {title}
      </div>
      {list.map(({ firstName, id, actionMakerId, username }) => (
        <SubscriptionItem
          username={username}
          firstName={firstName}
          subscribedToid={id}
          actionAuthorId={actionMakerId}
          type={type}
        />
      ))}
    </div>
  );
};

export default SubscriptionsList;
