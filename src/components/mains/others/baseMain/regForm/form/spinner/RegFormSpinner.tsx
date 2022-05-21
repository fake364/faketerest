import React from 'react';
import CircleSpinner, {
  SPINNER_COLORS
} from '../../../../../../../common/components/spinner/CircleSpinner';

type Props = {};

const RegFormSpinner: React.FC<Props> = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10 flex items-center justify-center">
      <CircleSpinner
        className={'w-[50px] h-[50px]'}
        color={SPINNER_COLORS.WHITE}
      />
    </div>
  );
};

export default RegFormSpinner;
