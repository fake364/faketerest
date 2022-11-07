import React, { useState } from 'react';
import UserAvatarImage from '../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import axios from 'axios';
import useFakeSnackbar from '../../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import { SUBSCRIPTION_TYPE } from '../SubscriptionsList';
import clsx from 'clsx';
import useFollowUnfollow from '../../../../../../common/hooks/useFollowUnfollow/useFollowUnfollow';

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
  const { onFollow, isSubscribed, onUnfollow } =
    useFollowUnfollow(subscribedToid);
  const myId = useSelector((state: RootState) => state.metadata.userId);
  const selectId =
    type === SUBSCRIPTION_TYPE.SUBSCRIBER ? actionAuthorId : subscribedToid;
  console.log(myId, type, subscribedToid, actionAuthorId, selectId === myId);

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
            {selectId === myId ? 'You' : 'Отписаться'}
          </SecondaryButton>
        ) : (
          <PrimaryButton onClick={onFollow}>Подписаться</PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default SubscriptionItem;
