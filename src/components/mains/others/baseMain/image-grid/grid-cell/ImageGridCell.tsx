import React from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';
import { rowStartClasses } from './utils/constants';

type Props = {
	startFrom?: 1 | 2 | 3 | 4;
	src: ImageProps['src'];
};

const ImageGridCell: React.FC<Props> = ({ startFrom, src }) => (
	<div
		className={clsx('row-span-4', rowStartClasses[startFrom - 1], 'relative')}
	>
		<Image
			className="rounded-[16px] h-max"
			src={src}
			layout={'fill'}
			objectFit="cover"
		/>
	</div>
);

export default ImageGridCell;
