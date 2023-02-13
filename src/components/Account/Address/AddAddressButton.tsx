import {
	createAddress,
	getCities,
	ICity,
	IUserFlat,
	StatusCode,
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

interface Props {
	user: IUserFlat;
	addUser: (user: IUserFlat) => void;
}

interface IFormInput {
	name: string;
	address1: string;
	address2: string;
	postCode: string;
	telephone: string;
	cityId: number;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} in={true} {...props} />;
});

const AddAddressButton = ({ user, addUser }: Props) => {
	const [showAddressDialog, setShowAddressDialog] = useState(false);
	const [cities, setCities] = useState<ICity[] | null>(null);

	const { register, handleSubmit } = useForm<IFormInput>();

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
		setShowAddressDialog(true);
	};

	const handleClose = () => {
		setShowAddressDialog(false);
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const selectedCity = cities?.find((city) => city.id === data.cityId);
		if (selectedCity) {
			const addressPayload = {
				...data,
				city: data.cityId,
				isDefault: false,
			};
			await createAddress(addressPayload, user, addUser).then(
				(response: any) => {
					setShowAddressDialog(false);
				}
			);
		}
	};

	return (
		<Grid container>
			<Grid
				item
				xs={11}
				sx={{
					width: 1,
					height: '60px',
					borderRadius: '10px',
					position: 'fixed',
					bottom: 0,
				}}>
				<Button
					fullWidth
					variant='contained'
					endIcon={<Add />}
					onClick={handleClickOpen}
					sx={{ width: '100%', padding: '15px' }}>
					Add New Address
				</Button>
			</Grid>
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
					open={showAddressDialog}
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
							<h2>Add new address</h2>
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
											maxLength: 40,
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

								<Grid item xs={12} sx={{ mt: 2 }}>
									<Button
										fullWidth
										variant='contained'
										endIcon={<Add />}
										type='submit'
										sx={{ width: '100%', padding: '15px' }}>
										Add Address
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

export default AddAddressButton;
