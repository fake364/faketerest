import React from 'react';
import UserAvatarImage from '../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import { SUBSCRIPTION_TYPE } from '../SubscriptionsList';
import clsx from 'clsx';
import useFollowUnfollow from '../../../../../../common/hooks/useFollowUnfollow/useFollowUnfollow';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  username: string;
  firstName: string;
  subscribedToid: number;
  actionAuthorId: number;
  type: SUBSCRIPTION_TYPE;
};

const SubscriptionItem: React.FC<Props> = ({
  actionAuthorId,
  username,
  subscribedToid,
  firstName,
  type
}) => {
  const { t } = useTranslation('common');
  const selectId =
    type === SUBSCRIPTION_TYPE.SUBSCRIBER ? actionAuthorId : subscribedToid;
  const { onFollow, isSubscribed, onUnfollow } = useFollowUnfollow(selectId);
  const myId = useSelector((state: RootState) => state.metadata.userId);

  return (
    <div className={'flex items-center gap-[12px] w-full justify-between'}>
      <div
        className={'flex items-center gap-[12px] cursor-pointer'}
        onClick={() => {
          window.location.assign('/' + username);
        }}
      >
        <UserAvatarImage userId={selectId} className={'w-[50px] h-[50px]'} />
        <div className={'font-medium'}>{firstName}</div>
      </div>

      <div>
        {isSubscribed || selectId === myId ? (
          <SecondaryButton
            onClick={onUnfollow}
            className={clsx(selectId === myId && 'pointer-events-none')}
          >
            {selectId === myId ? t('you') : t('unfollow')}
          </SecondaryButton>
        ) : (
          <PrimaryButton onClick={onFollow}>
            {t('fakePost.subscribe')}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default SubscriptionItem;
