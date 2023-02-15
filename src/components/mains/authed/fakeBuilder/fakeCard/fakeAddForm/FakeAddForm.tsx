import React from 'react';
import clsx from 'clsx';
import BottomLineInput from './input/BottomLineInput';
import UserImageName from './userImageName/UserImageName';
import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';
import useTranslation from 'next-translate/useTranslation';
import { AppDispatch } from '../../../../../../redux/types';
import { useDispatch } from 'react-redux';
import { changePostFieldById } from '../../../../../../redux/actions/fake-builder/actions';

type Props = {
  className?: string;
  fakePost: FakePostEntity;
};

const FakeAddForm: React.FC<Props> = ({
  className,
  fakePost: { description, title, id }
}) => {
  const { t } = useTranslation('common');
  const dispatch: AppDispatch = useDispatch();

  const onChangeField = (fieldName: keyof FakePostEntity) => (val) =>
    dispatch(changePostFieldById(id, fieldName, val));

  return (
    <div className={clsx('flex flex-col items-stretch gap-[32px]', className)}>
      <BottomLineInput
        className={'py-[4px] text-[36px] font-bold'}
        placeholder={t('fake-builder.inputs.title.placeholder')}
        subtitle={t('fake-builder.inputs.title.description')}
        onChange={onChangeField('title')}
        value={title}
        maxLength={100}
        placeholderClassName={'font-bold text-[36px]'}
      />
      <UserImageName />
      <BottomLineInput
        placeholder={t('fake-builder.inputs.description.placeholder')}
        subtitle={t('fake-builder.inputs.description.description')}
        className={'py-[14px]'}
        onChange={onChangeField('description')}
        value={description}
        maxLength={500}
      />
    </div>
  );
};

export default FakeAddForm;
