import React from 'react';
import CircleSpinner, {
  SPINNER_COLORS
} from '../../../../../../../../common/components/spinner/CircleSpinner';

type Props = {};

const ChatLoading: React.FC<Props> = () => {
  return (
    <div className={'absolute left-[45%] top-[45%]'}>
      <CircleSpinner
        className={'w-[50px] h-[50px]'}
        color={SPINNER_COLORS.DEFAULT}
      />
    </div>
  );
};

export default ChatLoading;
