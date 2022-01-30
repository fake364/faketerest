import React from 'react';
import { ImageProps } from 'next/image';
import { CommonTypes } from '../../../../../../common/types/common';
import ImageCell from './ImageCell';

export interface ImageGridProps extends CommonTypes.ShownType {
	startFrom?: 1 | 2 | 3 | 4;
	images: Array<ImageProps['src']>;
	index: number;
}

const ImageGridCell: React.FC<ImageGridProps> = ({
	startFrom,
	images,
	shownType,
	index,
}) => {
	return (
		<ImageCell images={images} startFrom={startFrom} shownType={shownType} index={index} />
	);
};

export default ImageGridCell;
