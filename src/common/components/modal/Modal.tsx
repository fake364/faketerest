import React from 'react';
import CircleIconButton from '../buttons/CircleIconButton';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import styles from './Modal.module.css';

type Props = { onClose: () => void };

const Modal: React.FC<Props> = ({ onClose, children }) => {
  const onClickForm = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.blackBackScreen} onClick={onClose}>
      <div className={styles.form} onClick={onClickForm}>
        <CircleIconButton
          Icon={FaTimes}
          onClick={onClose}
          className={'absolute right-0 !p-[6px] mr-[18px] mt-[12px]'}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
