import { ICategoryLevel1 } from '@houseofcodecy/hoc-utils';
import { Grid } from '@mui/material';
import React from 'react';

interface Props {
	categoriesLevel1: ICategoryLevel1[];
	nextRouter: any;
}

const HNavigationDesktop = ({ categoriesLevel1, nextRouter }: Props) => {
	return (
		<Grid container display={'flex'} columnSpacing={4}>
			{categoriesLevel1.map((category) => (
				<Grid item>{category.attributes.name}</Grid>
			))}
		</Grid>
	);
};

export default HNavigationDesktop;
