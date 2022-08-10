import React from 'react';
import Tooltip from '../../../../../common/components/tooltip/Tooltip';
import CircleIconButton from '../../../../../common/components/buttons/CircleIconButton';
import { FaBell } from '@react-icons/all-files/fa/FaBell';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import UserRoundButton from './user-button/UserRoundButton';

type Props = {};

const AuthNavButtons: React.FC<Props> = () => {
  return (
    <>
      <Tooltip text="Уведомления">
        <CircleIconButton
          Icon={FaBell}
          className="px-[12px]"
          onClick={() => null}
        />
      </Tooltip>
      <Tooltip text={'Сообщения'}>
        <CircleIconButton
          Icon={FaCommentDots}
          className="px-[12px]"
          onClick={() => null}
        />
      </Tooltip>
      <UserRoundButton />
    </>
  );
};

export default AuthNavButtons;
