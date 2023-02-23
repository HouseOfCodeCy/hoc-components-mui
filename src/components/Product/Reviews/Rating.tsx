import { Star, StarOutline } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import React from 'react';

interface Props {
	rating: number;
	mediaQuery: 'desktop' | 'mobile' | null;
}

const Rating = ({ rating, mediaQuery = 'mobile' }: Props) => {
	return (
		<Grid container>
			{[1, 2, 3, 4, 5].map((star) => {
				return (
					<Grid item key={star}>
						{rating >= star ? (
							<Star
								sx={{
									color: yellow[900],
									fontSize: mediaQuery === 'desktop' ? '34px' : '22px',
								}}
							/>
						) : (
							<StarOutline
								sx={{
									color: grey[900],
									fontSize: mediaQuery === 'desktop' ? '34px' : '22px',
								}}
							/>
						)}
					</Grid>
				);
			})}
		</Grid>
	);
};

export default Rating;
