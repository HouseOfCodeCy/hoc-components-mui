import { Button, Grid, Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface Props {
	media?: [{ image: string; url: string; alt: string }];
	width?: string;
	flexColumnSize?: number;
	autoPlay?: boolean;
	nextRouter?: any;
}

const HomeCarouselComponent = ({
	media,
	width,
	flexColumnSize = 11,
	autoPlay = false,
	nextRouter,
}: Props) => {
	return (
		<Grid container display={'flex'} justifyContent={'center'}>
			<Grid item xs={12} lg={flexColumnSize}>
				<Carousel
					fullHeightHover={false}
					autoPlay={autoPlay}
					indicators={true}
					navButtonsAlwaysVisible={false}
					cycleNavigation={true}
					animation={'slide'}
					swipe={true}
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
						minHeight: 500,
						maxHeight: 500,
					}}>
					{media?.length &&
						media?.map(
							(image: { image: string; url: string; alt: string }, i) => (
								<Paper key={i}>
									<img
										src={`${image?.image ? image.image : ''}`}
										alt={image?.alt ? image.alt : ''}
										height={460}
										style={{ objectFit: 'cover' }}
										width={width ? width : undefined}
									/>

									{image?.url && (
										<Button
											className='CheckButton'
											onClick={() => nextRouter.push(image.url)}>
											Check it out!
										</Button>
									)}
								</Paper>
							)
						)}
				</Carousel>
			</Grid>
		</Grid>
	);
};

export default HomeCarouselComponent;
