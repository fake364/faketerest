import React from 'react';
import clsx from 'clsx';
import styles from './DashedIconBlock.module.css';
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle';
import { RiArrowUpCircleFill } from '@react-icons/all-files/ri/RiArrowUpCircleFill';

type Props = { error?: string };

const DashedIconBlock: React.FC<Props> = ({ error, children }) => {
  return (
    <div className={clsx(styles.dashedUpload, error && '!border-[#CC0000]')}>
      {error ? (
        <FaExclamationTriangle className={clsx('text-[32px] text-[#CC0000]')} />
      ) : (
        <RiArrowUpCircleFill
          className={clsx('text-[32px]', 'text-[#767676]')}
        />
      )}
      <div className="text-[#111]">{children}</div>
    </div>
  );
};

export default DashedIconBlock;
