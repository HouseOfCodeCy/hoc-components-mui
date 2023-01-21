import { Star, StarOutline } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import React, { useState } from 'react';

const ReviewRating = () => {
	const [rating, setRating] = useState(0);
	return (
		<Grid container columnGap={1}>
			{[1, 2, 3, 4, 5].map((star) => {
				return (
					<Grid item key={star}>
						<IconButton
							aria-label='rating1'
							size='large'
							onClick={() => setRating(star)}>
							{rating >= star ? (
								<Star sx={{ color: yellow[900], fontSize: '34px' }} />
							) : (
								<StarOutline sx={{ color: grey[900], fontSize: '34px' }} />
							)}
						</IconButton>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default ReviewRating;
