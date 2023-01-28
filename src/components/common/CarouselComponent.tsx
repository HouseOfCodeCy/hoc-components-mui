import { Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface Props {
	media: string[];
}

const CarouselComponent = ({ media }: Props) => {
	return (
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
				minHeight: 280,
				maxHeight: 280,
			}}>
			{media.map((image, i) => (
				<Paper key={i}>
					<img src={`${image}`} alt={image} height={260} />
				</Paper>
			))}
		</Carousel>
	);
};

export default CarouselComponent;
