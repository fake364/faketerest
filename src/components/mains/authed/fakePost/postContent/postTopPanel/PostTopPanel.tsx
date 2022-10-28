import React from 'react';
import CircleIconButton from '../../../../../../common/components/buttons/CircleIconButton';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import { FiUpload } from '@react-icons/all-files/fi/FiUpload';
import { GrLink } from '@react-icons/all-files/gr/GrLink';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import useFakeSnackbar from '../../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import useTranslation from 'next-translate/useTranslation';

type Props = {};

const PostTopPanel: React.FC<Props> = () => {
  const { addFakeSnack } = useFakeSnackbar();
  const { t } = useTranslation('common');
  const copyCurrentUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    addFakeSnack({ text: t('fakePost.linkCopied') });
  };

  return (
    <div className={'flex justify-between sticky'}>
      <div className="flex gap-[4px]">
        <CircleIconButton
          className="text-[black]"
          Icon={BsThreeDots}
          onClick={null}
        />
        <CircleIconButton
          Icon={FiUpload}
          className="text-[black]"
          onClick={null}
        />
        <CircleIconButton
          Icon={GrLink}
          className="text-[black]"
          onClick={copyCurrentUrl}
        />
      </div>
      <div>
        <PrimaryButton>{t('fakePost.save')}</PrimaryButton>
      </div>
    </div>
  );
};

export default PostTopPanel;
