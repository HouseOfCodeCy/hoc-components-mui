import { Chip } from '@mui/material';
import React from 'react';

interface Props {
	label: string;
	size?: string;
	variant?: 'outlined' | 'filled' | undefined;
	color?: string;
}

const HChip = ({
	label,
	size = 'small',
	color = '#efdea7',
	variant = 'outlined',
}: Props) => {
	const handleClick = () => {
		console.info(`You clicked on chip: ${size}`);
	};

	return (
		<Chip
			sx={{ backgroundColor: color }}
			key={size}
			label={label}
			variant={variant}
			onClick={handleClick}
		/>
	);
};

export default HChip;
