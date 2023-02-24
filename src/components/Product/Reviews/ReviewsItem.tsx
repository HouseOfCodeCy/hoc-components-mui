import {
	CommonUtils,
	deleteReview,
	getReviewsByProductId,
	IProduct,
	IReview,
	IUserFlat,
} from '@houseofcodecy/hoc-utils';
import { Edit, HighlightOff } from '@mui/icons-material';
import { Box, Card, CardMedia, Grid, IconButton } from '@mui/material';
import { orange, red, yellow } from '@mui/material/colors';
import React, { SetStateAction, useState } from 'react';
import { useSnackBar } from '../../../providers/SnackBarProvider';
import EditReview from './EditReview';
import Rating from './Rating';

interface CustomProps {
	review: IReview;
	nextRouter?: any;
	showUserName?: boolean;
	showProductName?: boolean;
	showProductImage?: boolean;
	user?: IUserFlat | null | undefined;
	mediaQuery?: 'desktop' | 'mobile' | null;
	fetchReviews?: () => Promise<void>;
	product?: IProduct;
	setReviews?: (value: SetStateAction<IReview[] | undefined>) => void;
}

const ReviewsItem = (props: CustomProps) => {
	const {
		review,
		nextRouter,
		user,
		showProductImage = true,
		showUserName = true,
		showProductName = false,
		mediaQuery = 'mobile',
		fetchReviews,
		product,
		setReviews,
	} = props;

	const [showEditDialog, setShowEditDialog] = useState(false);
	const { showSnackBar } = useSnackBar();

	const deleteUserReview = async () => {
		await deleteReview(review.id).then(async (response) => {
			if (nextRouter.asPath.includes('account')) {
				// refresh reviews with user property
				fetchReviews &&
					(await fetchReviews().then((userReviewsResponse) => {
						showSnackBar('Review Deleted', 'success', 'Success');
					}));
			}
			// else if this is product reviews
			else {
				// refresh the product reviews, with user object
				await getReviewsByProductId(`${product?.id}`).then(
					(productReviewsResponse: any) => {
						setReviews && setReviews(productReviewsResponse.data.data);
						showSnackBar('Review Updated', 'success', 'Success');
					}
				);
			}
			showSnackBar('Review Deleted', 'success', 'Success');
		});
	};

	return (
		<Card
			sx={{
				w: 1,
				display: 'flex',
				justifyContent: 'flex-start',
			}}>
			{showProductImage &&
				review?.attributes.product?.data.attributes.mediaUrls && (
					<CardMedia
						component='img'
						sx={{
							objectFit: 'contain',
							textAlign: 'center',
							// minHeight: 210,
							// maxHeight: 210,
							maxWidth: mediaQuery === 'desktop' ? 160 : 100,
							minWidth: mediaQuery === 'desktop' ? 160 : 100,
							cursor: 'pointer',
						}}
						image={review?.attributes.product?.data.attributes.mediaUrls[0]}
						title={review?.attributes.product?.data.attributes.name}
						onClick={() =>
							nextRouter.push(`/product/${review?.attributes.product?.data.id}`)
						}
					/>
				)}
			<Grid container sx={{ w: 1, p: 3 }}>
				<Grid item xs={12}>
					<Grid container display={'flex'} justifyContent={'space-between'}>
						{showUserName && (
							<Grid item sx={{ fontWeight: '900', color: yellow[900] }}>
								{review.attributes.user?.data.attributes.name}
							</Grid>
						)}
						{showProductName && (
							<Grid item sx={{ fontWeight: '900', color: yellow[900] }}>
								{review.attributes.product?.data.attributes.name}
							</Grid>
						)}
						{review?.attributes.updatedAt && (
							<Grid item sx={{ fontWeight: '200', fontSize: '12px' }}>
								{CommonUtils.formatDate(review?.attributes.updatedAt)}
							</Grid>
						)}
					</Grid>
					<Grid container sx={{ pt: 2, pb: 3 }}>
						<Grid item xs={12} sx={{ fontWeight: '600' }}>
							{review?.attributes.title}
						</Grid>
						<Grid item xs={12}>
							{review?.attributes.reviewDescription}
						</Grid>
					</Grid>
					<Grid
						container
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}>
						<Grid item>
							<Rating
								rating={review?.attributes.rating}
								mediaQuery={mediaQuery}
							/>
						</Grid>
						<Grid item>
							{user?.id === review.attributes.user?.data.id && (
								<Box>
									<IconButton
										aria-label='EditReview'
										onClick={() => setShowEditDialog(true)}>
										<Edit sx={{ color: orange[900], fontSize: '40px' }} />
									</IconButton>
									<IconButton
										aria-label='deleteReview'
										onClick={deleteUserReview}>
										<HighlightOff sx={{ color: red[900], fontSize: '40px' }} />
									</IconButton>
								</Box>
							)}
						</Grid>
						<EditReview
							review={review}
							showEditReviewDialog={showEditDialog}
							setShowEditAddressDialog={setShowEditDialog}
							nextRouter={nextRouter}
							fetchReviews={fetchReviews}
							setReviews={setReviews}
							product={product}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
};

export default ReviewsItem;
