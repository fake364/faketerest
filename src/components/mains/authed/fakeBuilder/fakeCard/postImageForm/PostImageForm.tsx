import React from 'react';
import CircleSpinner, {
  SPINNER_COLORS
} from '../../../../../../common/components/spinner/CircleSpinner';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import ButtonDropdownElement from '../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import ImageDnDUpload from '../imageDnDUpload/ImageDnDUpload';
import FakeAddForm from '../fakeAddForm/FakeAddForm';
import useTranslation from 'next-translate/useTranslation';
import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';
import { PostChangeFunction } from '../../FakeBuilderContainer';

type Props = {
  postEntry: FakePostEntity;
  imageUrl?: string;
  handleChange: PostChangeFunction;
  onSubmit: () => void;
  onRemove: () => void;
};

const PostImageForm: React.FC<Props> = ({
  postEntry,
  imageUrl,
  handleChange,
  onSubmit,
  onRemove
}) => {
  const { t } = useTranslation('common');
  const error = postEntry?.errors?.find((err) => err.property === 'image');
  const dNdError = error?.constraints?.['isNotEmpty'];

  return (
    <>
      {postEntry.isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] z-[5] left-0 top-0 rounded-[12px]">
          <CircleSpinner
            color={SPINNER_COLORS.WHITE}
            className={'w-[62px] h-[62px]'}
          />
        </div>
      )}
      <div className="flex mb-[24px] justify-between">
        <DropdownRootElement
          variant={'icon'}
          Icon={BsThreeDots}
          dropdownClass={'z-[100] left-0 top-[12px]'}
          buttonClass={'!text-[22px] !p-[8px]'}
        >
          <ButtonDropdownElement onClick={onRemove}>
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
    </>
  );
};

export default PostImageForm;
