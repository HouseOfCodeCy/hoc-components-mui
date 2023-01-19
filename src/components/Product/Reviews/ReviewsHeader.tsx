import { IReview, ReviewUtils } from '@houseofcodecy/hoc-utils';
import { Grid } from '@mui/material';
import React from 'react';

interface Props {
	reviews?: IReview[];
}

const ReviewsHeader = ({ reviews }: Props) => {
	return (
		<Grid container>
			{reviews && reviews.length && (
				<Grid item xs={12}>
					<small>
						<strong>{ReviewUtils.calculateTotalReviews(reviews)} / 5</strong> |{' '}
						{reviews.length} Review(s)
					</small>
				</Grid>
			)}
			{!reviews ||
				(reviews?.length <= 0 && (
					<Grid item xs={12}>
						<small>
							<strong>No Reviews Yet </strong>
						</small>
					</Grid>
				))}
		</Grid>
	);
};

export default ReviewsHeader;
