import React from 'react';
import { RiEmotionSadLine } from '@react-icons/all-files/ri/RiEmotionSadLine';

type Props = {};

const NothingPosted: React.FC<Props> = () => {
  return (
    <div className={'flex flex-col items-center justify-center mt-[32px]'}>
      <RiEmotionSadLine className={'text-[98px] text-[#737373]'} />
      <div
        className={
          'text-[1.6rem] font-medium text-[#737373] max-w-[500px] text-center'
        }
      >
        Nothing has been posted yet. But you can try!
      </div>
    </div>
  );
};

export default NothingPosted;
