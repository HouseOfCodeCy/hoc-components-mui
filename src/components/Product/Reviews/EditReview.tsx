import {
	getReviewsByProductId,
	IProduct,
	IReview,
	IReviewBody,
	updateReview,
} from '@houseofcodecy/hoc-utils';
import { Add, Edit, Note } from '@mui/icons-material';
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import React, { SetStateAction, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackBar } from '../../../providers/SnackBarProvider';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';
import ReviewRating from './ReviewRating';

interface Props {
	review: IReview | null;
	showEditReviewDialog: boolean;
	setShowEditAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
	nextRouter?: any;
	fetchReviews?: () => Promise<void>;
	setReviews?: (value: SetStateAction<IReview[] | undefined>) => void;
	product?: IProduct;
}

interface IFormInput {
	reviewDescription: string;
	title: string;
}

const EditReview = ({
	review,
	showEditReviewDialog = false,
	setShowEditAddressDialog,
	nextRouter,
	fetchReviews,
	setReviews,
	product,
}: Props) => {
	const { register, handleSubmit } = useForm<IFormInput>();
	const [tempRating, setTempRating] = useState(0);
	const { showSnackBar } = useSnackBar();

	useEffect(() => {
		if (review) setTempRating(review.attributes.rating);
	}, [review]);

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		const reviewPayload: IReviewBody = {
			...data,
			rating: tempRating,
		};
		// update the review
		await updateReview(`${review?.id}`, reviewPayload).then(
			async (response: any) => {
				// if user is updating a review in profile
				if (nextRouter.asPath.includes('account')) {
					// refresh reviews with user property
					fetchReviews &&
						(await fetchReviews().then((userReviewsResponse) => {
							setShowEditAddressDialog(false);
							showSnackBar('Review Updated', 'success', 'Success');
						}));
				}
				// else if this is product reviews
				else {
					// refresh the product reviews, with user object
					await getReviewsByProductId(`${product?.id}`).then(
						(productReviewsResponse: any) => {
							setReviews && setReviews(productReviewsResponse.data.data);
							setShowEditAddressDialog(false);
							showSnackBar('Review Updated', 'success', 'Success');
						}
					);
				}
			}
		);
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showEditReviewDialog}
					setShowDialog={setShowEditAddressDialog}
					dialogHeader={`Edit Review`}
					dialogSubHeader={review?.attributes.product?.data.attributes.name}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container display={'flex'} rowGap={2} sx={{ p: 3 }}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id='outlined-basic'
									label={
										<Typography sx={{ fontWeight: 'bold' }}>Title *</Typography>
									}
									required
									defaultValue={review?.attributes.title}
									variant='filled'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Note />
											</InputAdornment>
										),
									}}
									sx={{
										borderRadius: '10px',
									}}
									{...register('title', {
										required: true,
										minLength: 3,
										maxLength: 50,
									})}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id='outlined-basic'
									required
									defaultValue={review?.attributes.reviewDescription}
									label={
										<Typography sx={{ fontWeight: 'bold' }}>
											Comment *
										</Typography>
									}
									variant='filled'
									sx={{ borderRadius: '10px' }}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Edit />
											</InputAdornment>
										),
									}}
									{...register('reviewDescription', {
										required: true,
										maxLength: 100,
									})}
								/>
							</Grid>
							<Grid item xs={12}>
								<ReviewRating
									reviewRating={review?.attributes.rating}
									label={'Your Rating:'}
									setTempRating={setTempRating}
								/>
							</Grid>

							<Grid item xs={12} sx={{ mt: 2 }}>
								<Button
									fullWidth
									variant='contained'
									endIcon={<Add />}
									type='submit'
									sx={{ width: '100%', padding: '15px' }}>
									Update Review
								</Button>
							</Grid>
						</Grid>
					</form>
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default EditReview;
