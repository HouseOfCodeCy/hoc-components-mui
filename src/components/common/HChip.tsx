import { Chip } from '@mui/material';
import React from 'react';

interface Props {
	label: string;
	size?: string;
	variant?: 'outlined' | 'filled' | undefined;
	color?: string;
	onClick?: () => void;
}

const HChip = ({
	label,
	size = 'small',
	color = '#efdea7',
	variant = 'outlined',
	onClick,
}: Props) => {
	return (
		<Chip
			sx={{ backgroundColor: color }}
			key={size}
			label={label}
			variant={variant}
			onClick={onClick}
		/>
	);
};

export default HChip;
