import React from 'react';
import SideButton from '../sideIconButton/SideButton';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaImage } from '@react-icons/all-files/fa/FaImage';
import clsx from 'clsx';
import { changePostFieldById } from '../../../../../../redux/actions/fake-builder/actions';
import { AppDispatch, RootState } from '../../../../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  className?: string;
  onClickPlus: () => void;
  isSelectionEnabled: boolean;
};

const ImagesSideColumn: React.FC<Props> = ({
  className,
  onClickPlus,
  isSelectionEnabled
}) => {
  const posts = useSelector((state: RootState) => state.fakePosts.posts);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={className}>
      <SideButton onClick={onClickPlus} className={'flex justify-center'}>
        <FaPlus />
      </SideButton>
      {posts.map(({ image, isSelected, id }) => (
        <SideButton
          onClick={() => {
            isSelectionEnabled &&
              dispatch(changePostFieldById(id, 'isSelected', !isSelected));
          }}
          className={clsx(
            isSelected && 'border-[#E60023] border-[2px] relative border-solid',
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
