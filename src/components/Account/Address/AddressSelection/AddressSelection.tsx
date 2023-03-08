import { AccountUtils, IAddress } from '@houseofcodecy/hoc-utils';
import {
	Add,
	ArrowForwardIos,
	ArrowForwardIosOutlined,
	LocationCity,
} from '@mui/icons-material';
import { Button, Chip, Grid, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import FullScreenDialog from '../../../common/Dialog/FullScreenDialog';

interface Props {
	addresses: IAddress[] | null;
	isCheckout?: boolean;
	shippingAddress: IAddress | null;
	updateShippingAddress: (address: IAddress) => void;
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
	actionLabel?: string;
	showAddNewAddress?: boolean;
	nextRouter?: any;
}

const AddressSelection = ({
	addresses,
	isCheckout,
	shippingAddress,
	updateShippingAddress,
	actionLabel = 'Change Address',
	showAddNewAddress = true,
	mediaQuery,
	nextRouter,
}: Props) => {
	const [selectedAddress, setSelectedAddress] = useState<IAddress | undefined>(
		undefined
	);
	const [showAddressDialog, setShowAddressDialog] = useState(false);

	const handleClickOpen = () => {
		setShowAddressDialog(true);
	};

	const handleClose = () => {
		setShowAddressDialog(false);
	};

	useEffect(() => {
		if (addresses && addresses.length > 0) {
			const storage = globalThis?.sessionStorage;
			const sessionShippingAddressId = storage.getItem('shippingAddress');
			const shippingAddresFromSession = addresses.find(
				(address) => address.id === +`${sessionShippingAddressId}`
			);
			const defaultAddress = addresses.find(
				(address) => address.attributes.isDefault
			);
			// if context has a shipping address
			if (shippingAddress) {
				setSelectedAddress(shippingAddress);
			}
			// if shipping address exists on session
			else if (shippingAddresFromSession) {
				updateShippingAddress(shippingAddresFromSession);
				setSelectedAddress(shippingAddresFromSession);
			}
			// set shipping address from account default
			else if (defaultAddress) {
				updateShippingAddress(defaultAddress);
				setSelectedAddress(defaultAddress);
			}
		}
	}, [addresses]);

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
					endIcon={!isCheckout ? <ArrowForwardIos /> : null}
					onClick={() => {
						!isCheckout ? handleClickOpen() : null;
					}}>
					<Grid container>
						{selectedAddress && (
							<Grid
								container
								display={'flex'}
								alignItems={'center'}
								columnGap={2}>
								<Grid item>
									<IconButton sx={{ color: grey[900] }}>
										<LocationCity />
									</IconButton>
								</Grid>
								<Grid
									item
									xs={9}
									sx={{ fontWeight: 'bold', fontSize: '16px', color: 'black' }}>
									{AccountUtils.printAddressAsString(selectedAddress)}
								</Grid>
							</Grid>
						)}
						<Grid item xs={12}>
							<small>
								{!isCheckout ? `${actionLabel}` : `Shipping Address`}
							</small>
						</Grid>
					</Grid>
				</Button>
			</Grid>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showAddressDialog}
					setShowDialog={setShowAddressDialog}
					mediaQuery={mediaQuery}
					dialogHeader='Addresses'>
					{addresses?.map((address) => {
						return (
							<Grid
								item
								key={address.id}
								xs={12}
								sx={{ padding: '10px', borderTop: '1px solid #beb8b8' }}>
								<Button
									sx={{
										padding: '15px',
										width: '100%',
										textAlign: 'left',
									}}
									onClick={() => {
										setSelectedAddress(address);
										handleClose();
										updateShippingAddress(address);
									}}
									endIcon={<ArrowForwardIosOutlined />}>
									<Grid container sx={{ color: 'black' }}>
										<Grid
											item
											xs={12}
											sx={{ fontWeight: 'bold', fontSize: '18px' }}>
											{address.attributes.address1}
										</Grid>
										<Grid item xs={12} sx={{ fontSize: '14px' }}>
											{address.attributes.address2}
										</Grid>
										<Grid item xs={12}>
											{`${address.attributes.city.data.attributes.name}, ${address.attributes.postCode}`}
										</Grid>
										<Grid item xs={12}>
											{`${address.attributes.telephone}`}
										</Grid>
										{address.attributes.isDefault ? (
											<Chip
												label='Default'
												color='success'
												sx={{ marginTop: '10px' }}></Chip>
										) : null}
										{address.id === selectedAddress?.id ? (
											<Chip
												label='Selected'
												color='warning'
												sx={{ marginTop: '10px' }}></Chip>
										) : null}
									</Grid>
								</Button>
							</Grid>
						);
					})}
					{showAddNewAddress && (
						<Grid item xs={12}>
							<Button
								variant='contained'
								endIcon={<Add />}
								onClick={() => nextRouter?.push(`/account/addresses`)}
								sx={{ width: '100%', padding: '15px' }}>
								Manage your Addresses
							</Button>
						</Grid>
					)}
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default AddressSelection;
