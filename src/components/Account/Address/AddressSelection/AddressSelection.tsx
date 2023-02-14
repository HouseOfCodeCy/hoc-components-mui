import {
	AccountUtils,
	IAddressFlat,
	IUserFlat,
} from '@houseofcodecy/hoc-utils';
import {
	Add,
	ArrowBackIos,
	ArrowForwardIos,
	ArrowForwardIosOutlined,
	LocationCity,
} from '@mui/icons-material';
import {
	AppBar,
	Button,
	Chip,
	Dialog,
	Grid,
	IconButton,
	Slide,
	Toolbar,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';

interface Props {
	user: IUserFlat;
	isCheckout?: boolean;
	shippingAddress: IAddressFlat | null;
	updateShippingAddress: (address: IAddressFlat) => void;
	actionLabel?: string;
	showAddNewAddress?: boolean;
	nextRouter?: any;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} in={true} {...props} />;
});

const AddressSelection = ({
	user,
	isCheckout,
	shippingAddress,
	updateShippingAddress,
	actionLabel = 'Change Address',
	showAddNewAddress = true,
	nextRouter,
}: Props) => {
	const [addresses, setAddresses] = useState<IAddressFlat[]>();
	const [selectedAddress, setSelectedAddress] = useState<
		IAddressFlat | undefined
	>(undefined);
	const [showAddressDialog, setShowAddressDialog] = useState(false);

	const handleClickOpen = () => {
		setShowAddressDialog(true);
	};

	const handleClose = () => {
		setShowAddressDialog(false);
	};

	useEffect(() => {
		if (user && user.addresses && user.addresses.length > 0) {
			setAddresses(user.addresses);
		}
	}, [user]);

	useEffect(() => {
		if (addresses && addresses.length > 0) {
			const storage = globalThis?.sessionStorage;
			const sessionShippingAddressId = storage.getItem('shippingAddress');
			const shippingAddresFromSession = addresses.find(
				(address) => address.id === +`${sessionShippingAddressId}`
			);
			const defaultAddress = addresses.find((address) => address.isDefault);
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
									{AccountUtils.printAddressAsStringFlat(selectedAddress)}
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
							<h2>Addresses</h2>
						</Grid>
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
												{address.address1}
											</Grid>
											<Grid item xs={12} sx={{ fontSize: '14px' }}>
												{address.address2}
											</Grid>
											<Grid item xs={12}>
												{`${address.city?.name}, ${address.postCode}`}
											</Grid>
											<Grid item xs={12}>
												{`${address.telephone}`}
											</Grid>
											{address.isDefault ? (
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
					</Grid>
				</Dialog>
			</Grid>
		</Grid>
	);
};

export default AddressSelection;
