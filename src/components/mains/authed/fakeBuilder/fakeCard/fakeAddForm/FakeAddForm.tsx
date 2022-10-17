import React from 'react';
import clsx from 'clsx';
import BottomLineInput from './input/BottomLineInput';
import UserImageName from './userImageName/UserImageName';
import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';
import { PostChangeFunction } from '../../FakeBuilderContainer';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation('common');

  return (
    <div className={clsx('flex flex-col items-stretch gap-[32px]', className)}>
      <BottomLineInput
        className={'py-[4px] text-[36px] font-bold'}
        placeholder={t('fake-builder.inputs.title.placeholder')}
        subtitle={t('fake-builder.inputs.title.description')}
        onChange={(val) => handleChange(id, 'title', val)}
        value={title}
        maxLength={100}
        placeholderClassName={'font-bold text-[36px]'}
      />
      <UserImageName />
      <BottomLineInput
        placeholder={t('fake-builder.inputs.description.placeholder')}
        subtitle={t('fake-builder.inputs.description.description')}
        className={'py-[14px]'}
        onChange={(val) => handleChange(id, 'description', val)}
        value={description}
        maxLength={500}
      />
    </div>
  );
};

export default FakeAddForm;
