import React from 'react';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import useFollowUnfollow from '../../../../../../common/hooks/useFollowUnfollow/useFollowUnfollow';
import useTranslation from 'next-translate/useTranslation';

type Props = { pageId: number };

const AnotherAccountButtons: React.FC<Props> = ({ pageId }) => {
  const { isSubscribed, onFollow, onUnfollow } = useFollowUnfollow(pageId);
  const { t } = useTranslation('common');

  return (
    <>
      {isSubscribed ? (
        <SecondaryButton
          className={'bg-[black] hover:bg-[black] text-[white]'}
          onClick={onUnfollow}
        >
          {t('unfollow')}
        </SecondaryButton>
      ) : (
        <PrimaryButton onClick={onFollow}>
          {t('fakePost.subscribe')}
        </PrimaryButton>
      )}
    </>
  );
};

export default AnotherAccountButtons;
