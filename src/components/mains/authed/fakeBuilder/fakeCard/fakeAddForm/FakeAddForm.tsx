import React from 'react';
import clsx from 'clsx';
import BottomLineInput from './input/BottomLineInput';
import UserImageName from './userImageName/UserImageName';

type Props = { className?: string };

const FakeAddForm: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx('flex flex-col items-stretch gap-[32px]', className)}>
      <BottomLineInput
        className={'py-[4px] px-[8px] text-[36px] font-bold'}
        placeholder={'Добавьте название'}
        subtitle={'В ленте видны только первые 40 символов'}
      />
      <UserImageName />
      <BottomLineInput
        placeholder={'Добавьте описание фэйка'}
        subtitle={
          'Когда люди нажимают на ваш фэйк, они обычно видят первые 40 символов'
        }
        className={'py-[14px] px-[4px]'}
      />
    </div>
  );
};

export default FakeAddForm;
