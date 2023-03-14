import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICategoryLevel1 } from '@houseofcodecy/hoc-utils';
import { Grid, IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
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
					<IconButton
						aria-label={category.attributes.description}
						title={category.attributes.description}
						onClick={() => nextRouter.push(`/categories/${category.id}`)}
						sx={{
							fontSize: !isScrolled ? '20px' : '15px',
							fontWeight: 'bold',
							p: 2,
							color: orange[50],
						}}>
						<Grid
							container
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							alignItems={'center'}
							rowGap={1}>
							<Grid
								item
								sx={{
									border: '2px solid #a39d9d78',
									borderRadius: '20px',
									padding: '3px',
									width: '40px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<FontAwesomeIcon
									icon={['fas', category.attributes.icon as IconName]}
									size='xl'
									color='#feb64d'
								/>
							</Grid>
							{!isScrolled && <Grid item>{category.attributes.name}</Grid>}
						</Grid>
					</IconButton>
				</>
			))}
		</>
	);
};

export default HNavigationDesktop;
