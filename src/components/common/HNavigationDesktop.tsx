import { ICategoryLevel1 } from '@houseofcodecy/hoc-utils';
import { Button } from '@mui/material';
import React from 'react';

interface Props {
	categoriesLevel1: ICategoryLevel1[];
	nextRouter: any;
	isScrolled: boolean;
}

const HNavigationDesktop = ({
	categoriesLevel1,
	nextRouter,
	isScrolled = false,
}: Props) => {
	return (
		<>
			{categoriesLevel1?.map((category) => (
				<>
					<Button
						id='demo-positioned-button'
						title={category.attributes.description}
						onClick={() => nextRouter.push(`/categories/${category.id}`)}
						sx={{
							fontSize: !isScrolled ? '20px' : '15px',
							fontWeight: 'bold',
						}}>
						{category.attributes.name}
					</Button>
				</>
			))}
		</>
	);
};

export default HNavigationDesktop;
