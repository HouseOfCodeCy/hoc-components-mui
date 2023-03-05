import {
	createAddress,
	getCities,
	ICity,
	IUserFlat,
	StatusCode,
} from '@houseofcodecy/hoc-utils';
import {
	Add,
	Home,
	LocationCity,
	LocationOn,
	Phone,
} from '@mui/icons-material';
import {
	Button,
	Checkbox,
	Grid,
	InputAdornment,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';

interface Props {
	user: IUserFlat;
	addUser: (user: IUserFlat) => void;
	fetchUserAddresses: () => Promise<void>;
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

const AddAddressButton = ({ user, addUser, fetchUserAddresses }: Props) => {
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

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const selectedCity = cities?.find((city) => city.id === data.cityId);
		if (selectedCity) {
			const addressPayload = {
				...data,
				city: data.cityId,
				isDefault: false,
				user: user.id,
			};
			await createAddress(addressPayload, user, addUser).then(
				async (response: any) => {
					await fetchUserAddresses();
					setShowAddressDialog(false);
				}
			);
		}
	};

	return (
		<Grid container>
			<Button
				fullWidth
				variant='contained'
				endIcon={<Add />}
				onClick={() => setShowAddressDialog(true)}
				sx={{ width: '100%', padding: '15px' }}>
				Add New Address
			</Button>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showAddressDialog}
					setShowDialog={setShowAddressDialog}
					dialogHeader='Add new address'>
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
							<Grid item xs={12}>
								<Grid
									container
									display={'flex'}
									alignItems={'center'}
									justifyContent={'flex-end'}>
									<Grid item xs={12}>
										<Checkbox
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
									Add Address
								</Button>
							</Grid>
						</Grid>
					</form>
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default AddAddressButton;
