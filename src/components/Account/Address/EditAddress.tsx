import {
	getCities,
	IAddress,
	IAddressBody,
	ICity,
	StatusCode,
	updateAddress,
} from '@houseofcodecy/hoc-utils';
import {
	Add,
	ArrowBackIos,
	Home,
	LocationCity,
	LocationOn,
	Phone,
} from '@mui/icons-material';
import {
	AppBar,
	Button,
	Checkbox,
	Dialog,
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useRef, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { TransitionProps } from 'react-transition-group/Transition';
import { useSnackBar } from '../../../providers/SnackBarProvider';

interface Props {
	address: IAddress | null;
	showEditAddressDialog: boolean;
	setShowEditAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormInput {
	name: string;
	address1: string;
	address2: string;
	postCode: string;
	telephone: string;
	cityId: number;
	isDefault: boolean;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} in={true} {...props} />;
});

const EditAddressDialog = ({
	address,
	showEditAddressDialog = false,
	setShowEditAddressDialog,
}: Props) => {
	const [cities, setCities] = useState<ICity[] | null>(null);

	const { register, handleSubmit } = useForm<IFormInput>();
	const { showSnackBar } = useSnackBar();

	const dataFetchedRef = useRef(false);

	useEffect(() => {
		async function fetchData() {
			await getCities().then(async (response: any) => {
				if (response.status === StatusCode.OK) {
					setCities(response.data.data as ICity[]);
				}
			});
		}
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		fetchData();
	}, []);

	const handleClickOpen = () => {
		setShowEditAddressDialog(true);
	};

	const handleClose = () => {
		setShowEditAddressDialog(false);
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		const selectedCity = cities?.find((city) => city.id === +data.cityId);
		if (selectedCity) {
			const addressPayload: IAddressBody = {
				...data,
				city: { data: selectedCity },
			};
			await updateAddress(`${address?.id}`, addressPayload).then(
				(response: any) => {
					setShowEditAddressDialog(false);
					showSnackBar('Address Edited', 'success', 'Success');
				}
			);
		}
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Dialog
					fullWidth
					PaperProps={{
						sx: {
							position: 'fixed',
							width: '100%',
							bottom: 0,
							left: 0,
							right: 0,
							m: 0,
						},
					}}
					open={showEditAddressDialog}
					onClose={handleClose}
					TransitionComponent={Transition}>
					<AppBar
						sx={{
							position: 'relative',
							backgroundColor: grey[900],
							height: '70px',
							display: 'flex',
							justifyContent: 'center',
						}}>
						<Toolbar sx={{ color: grey[700] }}>
							<IconButton
								edge='start'
								color='inherit'
								onClick={handleClose}
								aria-label='close'>
								<ArrowBackIos />
							</IconButton>
						</Toolbar>
					</AppBar>
					<Grid container>
						<Grid item xs={12} sx={{ textAlign: 'center' }}>
							<h2>Edit {address?.attributes.name}</h2>
						</Grid>
						{/* "handleSubmit" will validate your inputs before invoking
						"onSubmit" */}
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container display={'flex'} rowGap={2} sx={{ p: 3 }}>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id='outlined-basic'
										label={
											<Typography sx={{ fontWeight: 'bold' }}>
												Name *
											</Typography>
										}
										required
										defaultValue={address?.attributes.name}
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
										{...register('name', {
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
										value={address?.attributes.address1}
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
										{...register('address1', { required: true, maxLength: 40 })}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id='outlined-basic'
										label='Address 2'
										value={address?.attributes.address2}
										variant='filled'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<LocationOn />
												</InputAdornment>
											),
										}}
										sx={{ borderRadius: '10px' }}
										{...register('address2', { required: true, maxLength: 40 })}
									/>
								</Grid>
								<Grid item xs={12}>
									<Grid
										container
										display={'flex'}
										justifyContent={'space-between'}>
										<Grid item xs={4}>
											<TextField
												fullWidth
												label='Country Code'
												variant='filled'
												sx={{ borderRadius: '10px' }}
												value='357'
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<Add />
														</InputAdornment>
													),
												}}
												id='outlined-basic'
											/>
										</Grid>
										<Grid item xs={7}>
											<TextField
												fullWidth
												id='outlined-basic'
												required
												label='Telephone'
												value={address?.attributes.telephone}
												variant='filled'
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<Phone />
														</InputAdornment>
													),
												}}
												sx={{ borderRadius: '10px' }}
												{...register('telephone')}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid
										container
										display={'flex'}
										justifyContent={'space-between'}>
										<Grid item xs={4}>
											<TextField
												fullWidth
												id='outlined-basic'
												label='Post Code'
												value={address?.attributes.postCode}
												required
												variant='filled'
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<LocationCity />
														</InputAdornment>
													),
												}}
												sx={{ borderRadius: '10px' }}
												{...register('postCode')}
											/>
										</Grid>
										<Grid item xs={7}>
											<TextField
												fullWidth
												id='outlined-basic'
												label='City'
												select
												required
												value={address?.attributes.city.data.id}
												variant='filled'
												sx={{ borderRadius: '10px' }}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<LocationCity />
														</InputAdornment>
													),
												}}
												{...register('cityId')}>
												{cities?.map((option: ICity) => (
													<MenuItem key={option.id} value={option.id}>
														{option.attributes.name}
													</MenuItem>
												))}
											</TextField>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid
										container
										display={'flex'}
										alignItems={'center'}
										justifyContent={'space-between'}>
										<Grid item xs={12}>
											<Checkbox
												checked={address?.attributes.isDefault}
												color='success'
												size='medium'
												{...register('isDefault')}
											/>
											Default Address?
										</Grid>
									</Grid>
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
					</Grid>
				</Dialog>
			</Grid>
		</Grid>
	);
};

export default EditAddressDialog;
