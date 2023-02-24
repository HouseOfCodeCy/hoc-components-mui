import { IReview, IUserFlat, ReviewUtils } from '@houseofcodecy/hoc-utils';
import { Star } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';

interface Props {
	reviews?: IReview[];
	user?: IUserFlat | null | undefined;
	iconSize?: string;
}

const ReviewsHeader = ({ reviews, user, iconSize = '24px' }: Props) => {
	const hasUserAlreadyReviewedProduct = () => {
		if (user) {
			if (reviews && reviews.length) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	};

	const TotalReviews = () => {
		return (
			<Grid container display={'flex'} alignItems={'center'} columnGap={1}>
				<Grid item>
					<Star sx={{ color: yellow[700], fontSize: iconSize, w: 1 }} />
				</Grid>
				<Grid item xs={8}>
					<Grid container display={'flex'} alignItems={'center'}>
						<Grid item xs={12}>
							{reviews && reviews.length > 0 && (
								<small>
									<strong>
										{ReviewUtils.calculateTotalReviews(reviews)} / 5
									</strong>{' '}
									| {reviews.length} Review(s)
								</small>
							)}
							{(reviews === undefined ||
								reviews === null ||
								reviews.length === 0) && <small>No Reviews Yet!</small>}
						</Grid>
						{user && (
							<Grid item xs={12}>
								{hasUserAlreadyReviewedProduct() && (
									<small> Edit your Review! </small>
								)}
								{!hasUserAlreadyReviewedProduct() && (
									<small> Add your Review! </small>
								)}
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		);
	};

	return <TotalReviews />;
};

export default ReviewsHeader;
