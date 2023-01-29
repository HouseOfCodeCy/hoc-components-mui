import { Box, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';

interface Props {
	options: any[];
	title: string;
	placeholder?: string;
	helperText?: string;
	valueProperty: string;
}

const TextFieldSelect = ({
	options,
	title,
	placeholder = '',
	valueProperty,
	helperText = '',
}: Props) => {
	return (
		<Grid container rowGap={1}>
			<Grid item xs={12}>
				{title}
			</Grid>
			<Grid item xs={12}>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { m: 1, width: 1 },
					}}
					noValidate
					autoComplete='off'>
					<TextField
						fullWidth
						sx={{ w: 1 }}
						id={`text_field_${title}`}
						select
						helperText={helperText}
						placeholder={placeholder}>
						{options.map((option) => (
							<MenuItem key={option.id} value={option} sx={{ w: 1 }}>
								{`${option.attributes[valueProperty]}`}
								<strong>
									{option.attributes.price
										? ' - €' + option.attributes.price.toFixed(2)
										: ''}{' '}
								</strong>
							</MenuItem>
						))}
					</TextField>
				</Box>
			</Grid>
		</Grid>
	);
};

export default TextFieldSelect;
