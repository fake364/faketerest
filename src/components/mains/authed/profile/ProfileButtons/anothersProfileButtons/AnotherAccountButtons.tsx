import React from 'react';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import useFollowUnfollow from '../../../../../../common/hooks/useFollowUnfollow/useFollowUnfollow';

type Props = { pageId: number };

const AnotherAccountButtons: React.FC<Props> = ({ pageId }) => {
  const { isSubscribed, onFollow, onUnfollow } = useFollowUnfollow(pageId);

  return (
    <>
      {isSubscribed ? (
        <SecondaryButton
          className={'bg-[black] hover:bg-[black] text-[white]'}
          onClick={onUnfollow}
        >
          Отписаться
        </SecondaryButton>
      ) : (
        <PrimaryButton onClick={onFollow}>Подписаться</PrimaryButton>
      )}
    </>
  );
};

export default AnotherAccountButtons;
