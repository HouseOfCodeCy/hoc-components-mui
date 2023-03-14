import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICategoryLevel3 } from '@houseofcodecy/hoc-utils';
import { Grid, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

interface Props {
	categoriesLevel3: ICategoryLevel3[] | undefined;
	showName?: boolean;
	selectedCategoryLevel3: ICategoryLevel3 | undefined;
	handleSelectedCategoryLevel3: (selectedCategory: ICategoryLevel3) => void;
}

const DraggableCategories = ({
	categoriesLevel3,
	showName = true,
	selectedCategoryLevel3,
	handleSelectedCategoryLevel3,
}: Props) => {
	return (
		<Grid
			container
			display={'flex'}
			alignItems={'flex-start'}
			sx={{
				flexWrap: 'nowrap',
				overflowX: 'auto',
				overflowY: 'hidden',
				scrollBehavior: 'smooth',
				WebkitOverflowScrolling: 'touch',
			}}>
			{categoriesLevel3?.map((categoryLevel3) => {
				return (
					<Grid
						item
						xs={6}
						sx={{
							textAlign: 'center',
						}}>
						<IconButton
							onClick={() => handleSelectedCategoryLevel3(categoryLevel3)}>
							<Grid
								container
								display={'flex'}
								justifyContent={'center'}
								rowGap={1}>
								<Grid item xs={12} sx={{ textAlign: 'center' }}>
									<FontAwesomeIcon
										icon={['fas', categoryLevel3.attributes.icon as IconName]}
										size='2x'
										color={
											selectedCategoryLevel3?.id === categoryLevel3.id
												? '#4d82fe'
												: '#feb64d'
										}
									/>
								</Grid>
								{showName && (
									<Grid
										item
										xs={12}
										sx={{
											fontWeight: 'bold',
											textAlign: 'center',
											color: grey[900],
										}}>
										{categoryLevel3.attributes.name}
									</Grid>
								)}
							</Grid>
						</IconButton>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default DraggableCategories;
