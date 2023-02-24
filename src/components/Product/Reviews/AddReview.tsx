import {
	createReview,
	getReviewsByProductId,
	IProduct,
	IReview,
	IUserFlat,
} from '@houseofcodecy/hoc-utils';
import { Add, Subtitles, ViewStream } from '@mui/icons-material';
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import React, { SetStateAction, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackBar } from '../../../providers/SnackBarProvider';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';
import ReviewRating from './ReviewRating';

interface Props {
	showEditReviewDialog: boolean;
	setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
	nextRouter?: any;
	product?: IProduct;
	user?: IUserFlat | null | undefined;
	setReviews?: (value: SetStateAction<IReview[] | undefined>) => void;
}

interface IFormInput {
	reviewDescription: string;
	title: string;
}

const AddReview = ({
	showEditReviewDialog = false,
	setShowDialog,
	nextRouter,
	product,
	user,
	setReviews,
}: Props) => {
	const { register, handleSubmit } = useForm<IFormInput>();
	const [tempRating, setTempRating] = useState(0);
	const { showSnackBar } = useSnackBar();

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		const reviewPayload: any = {
			...data,
			rating: tempRating,
			product: product?.id,
			user: user?.id,
		};
		// update the review
		await createReview(reviewPayload).then(async (response: any) => {
			// if this is product reviews
			// refresh the product reviews, with user object
			await getReviewsByProductId(`${product?.id}`).then(
				(productReviewsResponse: any) => {
					setReviews && setReviews(productReviewsResponse.data.data);
					setShowDialog(false);
					showSnackBar('Review Updated', 'success', 'Success');
				}
			);
		});
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showEditReviewDialog}
					setShowDialog={setShowDialog}
					dialogHeader={`Add Review`}
					dialogSubHeader={product?.attributes.name}>
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
									variant='filled'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<ViewStream />
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
												<Subtitles />
											</InputAdornment>
										),
									}}
									{...register('reviewDescription', {
										required: true,
										maxLength: 40,
									})}
								/>
							</Grid>
							<Grid item xs={12}>
								<ReviewRating
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

export default AddReview;
