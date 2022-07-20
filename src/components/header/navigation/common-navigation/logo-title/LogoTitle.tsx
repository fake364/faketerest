import React, { useContext } from 'react';
import Image from 'next/image';
import logoPic from '../../../../../../public/logo.png';
import COMMON_CONSTANTS from '../../../../../common/constants/commons';
import ThemeContext from '../../../../../common/context/ThemeContext';

type Props = { titleOff?: boolean; width?: number; height?: number };

const LogoTitle: React.FC<Props> = ({
  titleOff = false,
  height = 32,
  width = 32
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex items-center">
      <Image src={logoPic} alt={'Logo'} width={width} height={height} />
      {!titleOff && (
        <span
          data-theme={theme}
          className="font-bold text-primary text-[20px] ml-[6px]"
        >
          {COMMON_CONSTANTS.TITLE}
        </span>
      )}
    </div>
  );
};

export default LogoTitle;
