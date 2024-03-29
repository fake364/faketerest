import React from 'react';
import CircleIconButton from '../../../../../../common/components/buttons/CircleIconButton';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import { FiUpload } from '@react-icons/all-files/fi/FiUpload';
import { GrLink } from '@react-icons/all-files/gr/GrLink';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import useFakeSnackbar from '../../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';

type Props = { className?: string };

const PostTopPanel: React.FC<Props> = ({ className }) => {
  const { addFakeSnack } = useFakeSnackbar();
  const { t } = useTranslation('common');

  const copyCurrentUrl = async () => {
      try {
          await navigator.clipboard.writeText(window.location.href);
          addFakeSnack({ text: t('fakePost.linkCopied') });
      }catch (e) {
          addFakeSnack({ text: 'Ваша ссылка не была скопирована' });
      }
  };

  return (
    <div className={clsx('flex justify-between', className)}>
      <div className="flex gap-[8px] ml-[8px]">
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
      <div className={'float-right'}>
        <PrimaryButton>{t('fakePost.save')}</PrimaryButton>
      </div>
    </div>
  );
};

export default PostTopPanel;
