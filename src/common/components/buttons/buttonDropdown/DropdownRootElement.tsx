import React, { ReactNode, useState } from 'react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { IconType } from '@react-icons/all-files';
import CircleIconButton from '../CircleIconButton';
import clsx from 'clsx';

type DropdownClassName = {
  dropdownClass?: string;
  buttonClass?: string;
  onOpenDropdown?: () => void;
};

type Props<T> = T extends { variant: 'text' }
  ? T & { text: string; children: ReactNode | ReactNode[] } & DropdownClassName
  : T extends { variant: 'icon' }
  ? T & {
      Icon: IconType;
      children: ReactNode | ReactNode[];
    } & DropdownClassName
  : never;

const DropdownRootElement = <T,>(props: Props<T>) => {
  const [isDisplayed, setDisplayed] = useState<boolean>(false);

  return (
    <div
      className="relative flex flex-col self-center"
      onBlur={() => setDisplayed(false)}
      tabIndex={0}
    >
      <div
        className="self-center font-medium cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisplayed) {
            props.onOpenDropdown?.();
          }
          setDisplayed(!isDisplayed);
        }}
      >
        {props.variant === 'text' && (
          <>
            <span>{props.text}</span> <FaChevronDown className="inline-block" />
          </>
        )}
        {props.variant === 'icon' && (
          <CircleIconButton
            Icon={props.Icon}
            className={clsx('px-[12px] text-[14px]', props.buttonClass)}
            onClick={() => null}
          />
        )}
      </div>
      {isDisplayed && (
        <div>
          <div
            className={clsx(
              'mt-[32px] absolute bg-[white] rounded-[18px] drop-shadow-md rounded-[18px] p-[8px]',
              props.dropdownClass
            )}
          >
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownRootElement;
