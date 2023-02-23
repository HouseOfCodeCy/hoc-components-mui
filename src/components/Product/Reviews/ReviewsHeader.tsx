import { IReview, ReviewUtils } from '@houseofcodecy/hoc-utils';
import { Star } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';

interface Props {
	reviews?: IReview[];
}

const ReviewsHeader = ({ reviews }: Props) => {
	const TotalReviews = () => {
		// if this item has reviews
		if (reviews === undefined || reviews === null || reviews.length === 0) {
			return (
				<Grid container columnGap={1}>
					<Grid item>
						<Star sx={{ color: yellow[700] }} />
					</Grid>
					<Grid item>
						<small>No Reviews Yet!</small>
					</Grid>
				</Grid>
			);
		} else {
			return (
				<Grid container columnGap={1}>
					<Grid item>
						<Star sx={{ color: yellow[700] }} />
					</Grid>
					<Grid item>
						<small>
							<strong>{ReviewUtils.calculateTotalReviews(reviews)} / 5</strong>{' '}
							| {reviews.length} Review(s)
						</small>
					</Grid>
				</Grid>
			);
		}
	};

	return <TotalReviews />;
};

export default ReviewsHeader;
