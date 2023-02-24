import { Star, StarOutline } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';

interface Props {
	reviewRating?: number;
	label?: string;
	setTempRating?: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewRating = ({ reviewRating, label, setTempRating }: Props) => {
	const [rating, setRating] = useState(0);

	useEffect(() => {
		if (reviewRating) setRating(reviewRating);
	}, [reviewRating]);

	return (
		<Grid container columnGap={1}>
			{label && (
				<Grid item xs={12}>
					{label}
				</Grid>
			)}
			{[1, 2, 3, 4, 5].map((star) => {
				return (
					<Grid item key={star}>
						<IconButton
							aria-label='rating1'
							size='large'
							onClick={() => {
								setRating(star);
								setTempRating && setTempRating(star);
							}}>
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
