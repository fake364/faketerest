import React from 'react';
import Tooltip from '../../../../../common/components/tooltip/Tooltip';
import CircleIconButton from '../../../../../common/components/buttons/CircleIconButton';
import { FaBell } from '@react-icons/all-files/fa/FaBell';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import UserRoundButton from './user-button/UserRoundButton';
import useTranslation from 'next-translate/useTranslation';

type Props = {};

const AuthNavButtons: React.FC<Props> = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Tooltip text={t('header.tooltips.notifications')}>
        <CircleIconButton Icon={FaBell} className="px-[12px]" onClick={null} />
      </Tooltip>
      <Tooltip text={t('header.tooltips.messages')}>
        <CircleIconButton
          Icon={FaCommentDots}
          className="px-[12px]"
          onClick={null}
        />
      </Tooltip>
      <UserRoundButton />
    </>
  );
};

export default AuthNavButtons;
