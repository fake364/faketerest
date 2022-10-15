import React from 'react';
import SideButton from '../sideIconButton/SideButton';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaImage } from '@react-icons/all-files/fa/FaImage';
import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';

type Props = {
  className?: string;
  posts: FakePostEntity[];
  onClickPlus: () => void;
};

const ImagesSideColumn: React.FC<Props> = ({
  posts,
  className,
  onClickPlus
}) => {
  return (
    <div className={className}>
      <SideButton onClick={onClickPlus}>
        <FaPlus />
      </SideButton>
      {posts.map(({ image }) => (
        <SideButton onClick={() => {}} className={'bg-[#E2E2E2] text-[gray]'}>
          {<FaImage />}
        </SideButton>
      ))}
    </div>
  );
};

export default ImagesSideColumn;
