import React from 'react';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import style from './MessageDropdown.module.css';

type Props = {};

const MessageDropdown: React.FC<Props> = () => {
  return (
    <DropdownRootElement
      variant={'icon'}
      Icon={FaCommentDots}
      className="px-[12px]"
      onClick={null}
      dropdownClass={style.dropdownContainer}
      buttonClass={'!text-[22px]'}
      tooltipText={'Messages'}
    >
      <div className={style.dropdownBody}></div>
    </DropdownRootElement>
  );
};

export default MessageDropdown;
