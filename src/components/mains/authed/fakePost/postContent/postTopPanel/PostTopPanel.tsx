import React from 'react';
import CircleIconButton from '../../../../../../common/components/buttons/CircleIconButton';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import { FiUpload } from '@react-icons/all-files/fi/FiUpload';
import { GrLink } from '@react-icons/all-files/gr/GrLink';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';

type Props = {};

const PostTopPanel: React.FC<Props> = () => {
  return (
    <div className={'flex justify-between mt-[24px] sticky'}>
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
          onClick={null}
        />
      </div>
      <div>
        <PrimaryButton>Сохранить</PrimaryButton>
      </div>
    </div>
  );
};

export default PostTopPanel;
