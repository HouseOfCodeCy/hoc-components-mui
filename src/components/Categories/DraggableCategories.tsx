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
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const DraggableCategories = ({
	categoriesLevel3,
	showName = true,
	selectedCategoryLevel3,
	handleSelectedCategoryLevel3,
	mediaQuery,
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
						key={categoryLevel3.id}
						item
						xs={6}
						sx={{
							textAlign: 'center',
						}}>
						<IconButton
							onClick={() => handleSelectedCategoryLevel3(categoryLevel3)}
							sx={{ ':hover': { backgroundColor: 'transparent' } }}>
							<Grid
								container
								display={'flex'}
								justifyContent={'center'}
								rowGap={1}>
								<Grid item xs={12} sx={{ textAlign: 'center' }}>
									<FontAwesomeIcon
										icon={['fas', categoryLevel3.attributes.icon as IconName]}
										size={
											mediaQuery === 'mobile' || mediaQuery === 'tablet'
												? '2x'
												: '1x'
										}
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
											fontSize:
												mediaQuery === 'mobile' || mediaQuery === 'tablet'
													? '18px'
													: '16px',
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
