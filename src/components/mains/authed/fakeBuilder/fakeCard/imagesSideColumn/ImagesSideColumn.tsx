import React from 'react';
import SideButton from '../sideIconButton/SideButton';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaImage } from '@react-icons/all-files/fa/FaImage';
import FakePostEntity from '../../../../../../common/classes/fakePostEntity/FakePostEntity';
import Image from 'next/image';
import { PostChangeFunction } from '../../FakeBuilderContainer';
import clsx from 'clsx';

type Props = {
  className?: string;
  posts: FakePostEntity[];
  onClickPlus: () => void;
  handleChange: PostChangeFunction;
};

const ImagesSideColumn: React.FC<Props> = ({
  posts,
  className,
  onClickPlus,
  handleChange
}) => {
  return (
    <div className={className}>
      <SideButton onClick={onClickPlus} className={'flex justify-center'}>
        <FaPlus />
      </SideButton>
      {posts.map(({ image, isSelected, id }) => (
        <SideButton
          onClick={() => handleChange(id, 'isSelected', !isSelected)}
          className={clsx(
            isSelected &&
              'border-[#E60023] border-[2px] relative border-solid',
            'bg-[#E2E2E2] text-[gray] flex justify-center'
          )}
        >
          {<FaImage />}
        </SideButton>
      ))}
    </div>
  );
};

export default ImagesSideColumn;
