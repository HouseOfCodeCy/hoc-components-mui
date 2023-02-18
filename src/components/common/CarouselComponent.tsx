import { Grid, Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface Props {
	media: string[];
	width?: string;
	flexColumnSize?: number;
}

const CarouselComponent = ({ media, width, flexColumnSize = 4 }: Props) => {
	return (
		<Grid container display={'flex'} justifyContent={'center'}>
			<Grid item xs={11} lg={flexColumnSize}>
				<Carousel
					fullHeightHover={false}
					autoPlay={false}
					indicators={true}
					navButtonsAlwaysVisible={true}
					cycleNavigation={true}
					animation={'slide'}
					duration={100}
					navButtonsProps={{
						// Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
						style: {
							backgroundColor: 'black',
							borderRadius: 5,
						},
					}}
					navButtonsWrapperProps={{
						// Move the buttons to the bottom. Unsetting top here to override default style.
						style: {
							bottom: '0',
							top: 'unset',
						},
					}}
					sx={{
						textAlign: 'center',
						minHeight: 360,
						maxHeight: 360,
					}}>
					{media.map((image, i) => (
						<Paper key={i}>
							<img
								src={`${image}`}
								alt={image}
								height={360}
								width={width ? width : undefined}
							/>
						</Paper>
					))}
				</Carousel>
			</Grid>
		</Grid>
	);
};

export default CarouselComponent;
