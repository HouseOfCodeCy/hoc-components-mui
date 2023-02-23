import { IReview, IReviewBody, updateReview } from '@houseofcodecy/hoc-utils';
import { Add, Edit, Note, Star } from '@mui/icons-material';
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackBar } from '../../../providers/SnackBarProvider';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';

interface Props {
	review: IReview | null;
	showEditReviewDialog: boolean;
	setShowEditAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormInput {
	reviewDescription: string;
	title: string;
	rating: number;
}

const EditReviewDialog = ({
	review,
	showEditReviewDialog = false,
	setShowEditAddressDialog,
}: Props) => {
	const { register, handleSubmit } = useForm<IFormInput>();
	const { showSnackBar } = useSnackBar();

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		const reviewPayload: IReviewBody = {
			...data,
		};
		await updateReview(`${review?.id}`, reviewPayload).then((response: any) => {
			setShowEditAddressDialog(false);
			showSnackBar('Review Updated', 'success', 'Success');
		});
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
										maxLength: 40,
									})}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id='outlined-basic'
									label='Rating'
									defaultValue={review?.attributes.rating}
									variant='filled'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Star />
											</InputAdornment>
										),
									}}
									sx={{ borderRadius: '10px' }}
									{...register('rating', { required: true, maxLength: 40 })}
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

export default EditReviewDialog;
