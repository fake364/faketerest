import React, { useState } from 'react';
import Modal from '../../../../../common/components/modal/Modal';
import SubscriptionsList, {
  SUBSCRIPTION_TYPE
} from '../subscriptionsLists/SubscriptionsList';
import { SubscriptionEntry } from '../../../../../../pages/[username]';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  subscribers: SubscriptionEntry[];
  subscriptions: SubscriptionEntry[];
};

const SubscriptionsBlock: React.FC<Props> = ({
  subscriptions,
  subscribers
}) => {
  const { t } = useTranslation('profile');

  const [areSubscriptionsShown, setSubscriptionsShown] = useState(false);
  const [areSubscribersShown, setSubscribersShown] = useState(false);

  const setSubscriptionsFlag = (flag: boolean) => () => {
    setSubscriptionsShown(flag);
  };

  const setSubscribersFlag = (flag: boolean) => () => {
    setSubscribersShown(flag);
  };

  return (
    <>
      <div className={'flex gap-[12px] text-[16px] mt-[10px]'}>
        {subscribers.length > 0 && (
          <div
            className={'font-[500] cursor-pointer'}
            onClick={setSubscribersFlag(true)}
          >
            {t('subscriber', { count: subscribers.length }).toLowerCase()}
          </div>
        )}
        {subscriptions.length > 0 && (
          <div
            className="text-[16px] cursor-pointer"
            onClick={setSubscriptionsFlag(true)}
          >
            {t('subscription', { count: subscriptions.length }).toLowerCase()}
          </div>
        )}
      </div>
      {areSubscriptionsShown && (
        <Modal onClose={setSubscriptionsFlag(false)}>
          <SubscriptionsList
            list={subscriptions}
            title={t('subscriptions')}
            type={SUBSCRIPTION_TYPE.SUBSCRIPTION}
          />
        </Modal>
      )}
      {areSubscribersShown && (
        <Modal onClose={setSubscribersFlag(false)}>
          <SubscriptionsList
            list={subscribers}
            title={t('subscribers')}
            type={SUBSCRIPTION_TYPE.SUBSCRIBER}
          />
        </Modal>
      )}
    </>
  );
};

export default SubscriptionsBlock;
