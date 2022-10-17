import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import ImageDnDUpload from './imageDnDUpload/ImageDnDUpload';
import FakeAddForm from './fakeAddForm/FakeAddForm';
import DropdownRootElement from '../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import ButtonDropdownElement from '../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import FakePostEntity from '../../../../../common/classes/fakePostEntity/FakePostEntity';
import { PostChangeFunction } from '../FakeBuilderContainer';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  className?: string;
  postEntry: FakePostEntity;
  handleChange: PostChangeFunction;
  onRemoveCard: (id: number) => void;
  onSubmit: () => void;
};

const FakeCard: React.FC<Props> = ({
  className,
  handleChange,
  postEntry,
  onRemoveCard,
  onSubmit
}) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (postEntry.image) {
      const fr = new FileReader();
      fr.onload = function () {
        setImageUrl(fr.result as string);
      };
      fr.readAsDataURL(postEntry.image);
    } else {
      setImageUrl(null);
    }
  }, [postEntry.image]);

  const error = postEntry?.errors?.find((err) => err.property === 'image');
  const dNdError = error?.constraints?.['isNotEmpty'];

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
          <ButtonDropdownElement onClick={() => onRemoveCard(postEntry.id)}>
            {t('fake-builder.remove')}
          </ButtonDropdownElement>
        </DropdownRootElement>
        <div>
          <PrimaryButton onClick={onSubmit}>
            {t('fake-builder.save')}
          </PrimaryButton>
        </div>
      </div>
      <div className="flex gap-[42px]">
        <ImageDnDUpload
          className={'flex-1'}
          src={imageUrl}
          onImageDrop={(file) => handleChange(postEntry.id, 'image', file)}
          error={dNdError}
        />
        <FakeAddForm
          className={'flex-[2]'}
          fakePost={postEntry}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FakeCard;
