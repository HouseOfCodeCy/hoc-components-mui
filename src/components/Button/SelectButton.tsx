import { Grid, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

interface Props {
	value?: string;
	icon?: JSX.Element;
}

const SelectButton = ({ value, icon }: Props) => {
	return (
		<IconButton sx={{ color: grey[900] }}>
			<Grid container columnGap={2}>
				<Grid item>{icon}</Grid>
				<Grid item>{value}</Grid>
			</Grid>
		</IconButton>
	);
};

export default SelectButton;
