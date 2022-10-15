import React from 'react';
import clsx from 'clsx';
import BottomLineInput from './input/BottomLineInput';
import UserImageName from './userImageName/UserImageName';
import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';
import { PostChangeFunction } from '../../FakeBuilderContainer';

type Props = {
  className?: string;
  fakePost: FakePostEntity;
  handleChange: PostChangeFunction;
};

const FakeAddForm: React.FC<Props> = ({
  className,
  fakePost: { description, title, id },
  handleChange
}) => {
  return (
    <div className={clsx('flex flex-col items-stretch gap-[32px]', className)}>
      <BottomLineInput
        className={'py-[4px] px-[8px] text-[36px] font-bold'}
        placeholder={'Добавьте название'}
        subtitle={'В ленте видны только первые 40 символов'}
        onChange={(val) => handleChange(id, 'title', val)}
        value={title}
      />
      <UserImageName />
      <BottomLineInput
        placeholder={'Добавьте описание фэйка'}
        subtitle={
          'Когда люди нажимают на ваш фэйк, они обычно видят первые 40 символов'
        }
        className={'py-[14px] px-[4px]'}
        onChange={(val) => handleChange(id, 'description', val)}
        value={description}
      />
    </div>
  );
};

export default FakeAddForm;
