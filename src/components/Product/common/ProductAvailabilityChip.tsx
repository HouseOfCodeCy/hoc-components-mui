import React from 'react';
import HChip from '../../common/HChip';

interface Props {
	label: string;
}

const ProductAvailabilityChip = ({ label }: Props) => {
	const definedChipColor = () => {
		switch (label) {
			case 'Out of Stock':
				return `${'#E26E5F'}`;
			case 'Few items left':
				return `${'#CDE25F'}`;
			case 'Low in Stock':
				return `${'#E27A5F'}`;

			default:
				return `${'#E2915F'}`;
		}
	};
	return <HChip label={label} color={definedChipColor()} />;
};

export default ProductAvailabilityChip;
