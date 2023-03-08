import {
	IProduct,
	IReview,
	IUserFlat,
	ReviewUtils,
} from '@houseofcodecy/hoc-utils';
import { Add, ArrowForwardIos, Star } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { yellow } from '@mui/material/colors';
import React, { SetStateAction, useState } from 'react';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';
import AddReview from './AddReview';
import ReviewsHeader from './ReviewsHeader';
import ReviewsItem from './ReviewsItem';

interface Props {
	reviews: IReview[] | undefined;
	setReviews?: (value: SetStateAction<IReview[] | undefined>) => void;
	user: IUserFlat | null | undefined;
	mediaQuery?: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
	nextRouter?: any;
	fetchReviews?: () => Promise<void>;
	product?: IProduct;
}

const ReviewsButton = ({
	reviews,
	user,
	mediaQuery = 'mobile',
	nextRouter,
	fetchReviews,
	product,
	setReviews,
}: Props) => {
	const [showAddressDialog, setShowAddressDialog] = useState(false);
	const [showAddReviewDialog, setShowAddReviewDialog] = useState(false);

	const RenderAddReviewButton = () => {
		if (
			reviews?.filter((review) => review.attributes.user?.data.id === user?.id)
				?.length === 0
		) {
			return (
				<Button
					variant='contained'
					endIcon={<Add />}
					onClick={() => setShowAddReviewDialog(true)}
					sx={{
						width: 1,
					}}>
					Add your review
				</Button>
			);
		} else {
			return null;
		}
	};

	return (
		<Grid container sx={{ padding: '5px' }}>
			<Grid item xs={12} sx={{ paddingBottom: '10px' }}>
				<Button
					sx={{
						border: '1px solid #CBBEB5',
						borderRadius: '10px',
						padding: '15px',
						width: '100%',
						textAlign: 'left',
					}}
					endIcon={<ArrowForwardIos />}
					onClick={() => {
						setShowAddressDialog(true);
					}}>
					<ReviewsHeader reviews={reviews} user={user} iconSize={'44px'} />
				</Button>
			</Grid>

			<Grid item xs={12}>
				<FullScreenDialog
					show={showAddressDialog}
					setShowDialog={setShowAddressDialog}
					mediaQuery={mediaQuery}
					dialogHeader='Reviews'
					dialogAction={RenderAddReviewButton()}
					dialogSubHeader={product?.attributes.name}>
					<Grid item xs={12}>
						<Grid
							container
							display={'flex'}
							justifyContent={'center'}
							sx={{ p: 2 }}>
							<Grid
								item
								sx={{
									textAlign: 'center',
									p: 3,
									borderRadius: '45px',
									backgroundColor: '#debd65b0',
								}}>
								<Star
									sx={{
										fontSize: '76px',
										color: yellow[500],
									}}
								/>
							</Grid>
							{reviews && reviews?.length > 0 && (
								<Grid item xs={12} sx={{ textAlign: 'center', pt: 1 }}>
									{ReviewUtils.calculateTotalReviews(reviews)} / 5
								</Grid>
							)}
							{reviews && reviews?.length > 0 && (
								<Grid item xs={12} sx={{ textAlign: 'center' }}>
									Based on {reviews?.length} total reviews
								</Grid>
							)}
							{reviews && reviews?.length === 0 && (
								<Grid item xs={12} sx={{ textAlign: 'center', pt: 2 }}>
									Be the first that reviews this product!
								</Grid>
							)}
						</Grid>
					</Grid>
					{reviews?.map((review) => {
						return (
							<Grid
								item
								key={review.id}
								xs={12}
								sx={{
									padding: '10px',
									borderTop: '1px solid #beb8b8',
								}}>
								<ReviewsItem
									review={review}
									setReviews={setReviews}
									user={user}
									showProductImage={false}
									nextRouter={nextRouter}
									fetchReviews={fetchReviews}
									product={product}
								/>
							</Grid>
						);
					})}
				</FullScreenDialog>
			</Grid>

			<Grid item xs={12}>
				<AddReview
					showEditReviewDialog={showAddReviewDialog}
					setShowDialog={setShowAddReviewDialog}
					nextRouter={nextRouter}
					product={product}
					mediaQuery={mediaQuery}
					user={user}
					setReviews={setReviews}
				/>
			</Grid>
		</Grid>
	);
};

export default ReviewsButton;
