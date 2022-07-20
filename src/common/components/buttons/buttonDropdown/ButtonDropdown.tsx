import React, { useState } from 'react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';

type Props = {};

const ButtonDropdown: React.FC<Props> = ({ children }) => {
  const [isDisplayed, setDisplayed] = useState<boolean>(false);

  return (
    <div
      className="relative flex flex-col self-center"
      onBlur={() => setDisplayed(false)}
    >
      <div
        className="self-center font-medium ml-[12px] cursor-pointer"
        onClick={() => setDisplayed(!isDisplayed)}
      >
        <span>Создать</span> <FaChevronDown className="inline-block" />
      </div>
      {isDisplayed && (
        <div>
          <div className="mt-[32px] absolute left-[-56px] bg-[white] rounded-[18px] drop-shadow-md rounded-[18px] p-[8px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;
