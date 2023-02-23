import { IReview, IReviewBody, updateReview } from '@houseofcodecy/hoc-utils';
import { Add, Home, LocationOn } from '@mui/icons-material';
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
	showEditAddressDialog: boolean;
	setShowEditAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormInput {
	reviewDescription: string;
	title: string;
	rating: number;
}

const EditAddressDialog = ({
	review,
	showEditAddressDialog = false,
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
					show={showEditAddressDialog}
					setShowDialog={setShowEditAddressDialog}
					dialogHeader={`Edit ${review?.attributes.product?.data.attributes.name}`}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container display={'flex'} rowGap={2} sx={{ p: 3 }}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id='outlined-basic'
									label={
										<Typography sx={{ fontWeight: 'bold' }}>Name *</Typography>
									}
									required
									defaultValue={review?.attributes.title}
									variant='filled'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Home />
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
											Address *
										</Typography>
									}
									variant='filled'
									sx={{ borderRadius: '10px' }}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<LocationOn />
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
									label='Address 2'
									defaultValue={review?.attributes.rating}
									variant='filled'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<LocationOn />
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
									Update Address
								</Button>
							</Grid>
						</Grid>
					</form>
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default EditAddressDialog;
