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
import { useSnackBar } from '../../../providers/SnackBarProvider';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';

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
				<FullScreenDialog
					show={showEditAddressDialog}
					setShowDialog={setShowEditAddressDialog}
					dialogHeader={`Edit ${address?.attributes.name}`}>
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
									defaultValue={address?.attributes.address1}
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
									defaultValue={address?.attributes.address2}
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
											defaultValue={address?.attributes.telephone}
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
											defaultValue={address?.attributes.postCode}
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
											defaultValue={address?.attributes.city.data.id}
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
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default EditAddressDialog;
