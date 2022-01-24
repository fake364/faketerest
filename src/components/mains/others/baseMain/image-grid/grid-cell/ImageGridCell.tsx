import React, { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';
import { rowStartClasses } from './utils/constants';
import { Motion, spring } from 'react-motion';
import { CommonTypes } from '../../../../../../common/types/common';

interface Props extends CommonTypes.ShownType {
	startFrom?: 1 | 2 | 3 | 4;
	src: ImageProps['src'];
}

const ImageGridCell: React.FC<Props> = ({ startFrom, src, shownType }) => {
	return (
		<Motion key={shownType} defaultStyle={{ y: -20 }} style={{ y: spring(80) }}>
			{({ y }) => (
				<div
					className={clsx('row-span-4', rowStartClasses[startFrom - 1], 'relative')}
					style={{
						WebkitTransform: `translate3d(0, -${y}px, 0)`,
						transform: `translate3d(0, -${y}px, 0)`
					}}
				>
					<Image
						className="rounded-[16px] h-max"
						src={src}
						layout={'fill'}
						objectFit="cover"
					/>
				</div>
			)}
		</Motion>
	);
};

export default ImageGridCell;
