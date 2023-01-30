import { Box, Grid, MenuItem, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
	options: any[];
	title: string;
	placeholder?: string;
	helperText?: string;
	valueProperty: string;
	setSelectedOption: Dispatch<SetStateAction<any | null>>;
	inventory?: any;
	requried?: boolean;
	otherSelectedOption?: any;
}

const TextFieldSelect = ({
	options,
	title,
	placeholder = '',
	valueProperty,
	helperText = '',
	setSelectedOption,
	inventory,
	requried = true,
	otherSelectedOption,
}: Props) => {
	const calculateStockLabel = (option: any) => {
		const inventoryStock = inventory.find(
			(stock: any) => stock.id === option.id
		);
		if (inventoryStock) {
			// if I have something selected already
			if (title === 'Product Colors' && otherSelectedOption) {
				const otherOptionStock = inventoryStock.sizeInventory.find(
					(inventory: any) => inventory.id === otherSelectedOption?.id
				).quantity;
				return ` - Stock: ${otherOptionStock}`;
			}
			// if I have something selected already
			else if (title === 'Product Sizes' && otherSelectedOption) {
				const otherOptionStock = inventoryStock.colorInventory.find(
					(inventory: any) => inventory.id === otherSelectedOption?.id
				).quantity;
				return ` - Stock: ${otherOptionStock}`;
			}
			return ` - Stock: ${inventoryStock.total}`;
		} else {
			return ``;
		}
	};

	const checkIfDisabled = (option: any): boolean => {
		const inventoryStock = inventory.find(
			(stock: any) => stock.id === option.id
		);
		if (inventoryStock.total <= 0) {
			return true;
		} else {
			if (title === 'Product Colors' && otherSelectedOption) {
				const otherOptionStock = inventoryStock.sizeInventory.find(
					(inventory: any) => inventory.id === otherSelectedOption.id
				).quantity;
				return otherOptionStock >= 1 ? false : true;
			} else if (title === 'Product Sizes' && otherSelectedOption) {
				const otherOptionStock = inventoryStock.colorInventory.find(
					(inventory: any) => inventory.id === otherSelectedOption.id
				).quantity;
				return otherOptionStock >= 1 ? false : true;
			}
		}
		return false;
	};

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
						required={requried}
						label={helperText}
						placeholder={placeholder}>
						{options.map((option) => (
							<MenuItem
								key={option.id}
								value={option}
								disabled={checkIfDisabled(option)}
								sx={{ w: 1 }}
								onClick={() => setSelectedOption(option)}>
								{`${option.attributes[valueProperty]}`}
								<strong>
									{option.attributes.price
										? ' - €' + option.attributes.price.toFixed(2)
										: ''}{' '}
								</strong>
								{calculateStockLabel(option)}
							</MenuItem>
						))}
					</TextField>
				</Box>
			</Grid>
		</Grid>
	);
};

export default TextFieldSelect;
