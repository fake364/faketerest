import React from 'react';
import clsx from 'clsx';
import ImageDnDUpload, { ImageDnDProps } from './imageDnDUpload/ImageDnDUpload';
import FakeAddForm from './fakeAddForm/FakeAddForm';
import DropdownRootElement from '../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import ButtonDropdownElement from '../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';

type Props = { className?: string } & Pick<ImageDnDProps, 'onImageDrop'>;

const FakeCard: React.FC<Props> = ({ className, onImageDrop }) => {
  return (
    <div
      className={clsx(
        'bg-[white] rounded-[16px] px-[62px] py-[36px] w-[880px] mt-[32px]',
        className
      )}
    >
      <div className="flex mb-[24px] justify-between">
        <DropdownRootElement
          variant={'icon'}
          Icon={BsThreeDots}
          dropdownClass={'z-[100] left-0 top-[12px]'}
          buttonClass={'!text-[22px] !p-[8px]'}
        >
          <ButtonDropdownElement onClick={null}>Удалить</ButtonDropdownElement>
        </DropdownRootElement>
        <div>
          <PrimaryButton>Сохранить</PrimaryButton>
        </div>
      </div>
      <div className="flex gap-[42px]">
        <ImageDnDUpload className={'flex-1'} onImageDrop={onImageDrop} />
        <FakeAddForm className={'flex-[2]'} />
      </div>
    </div>
  );
};

export default FakeCard;
