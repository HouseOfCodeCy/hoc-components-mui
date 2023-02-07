import {
	getShippingMethods,
	IShippingMethod,
	OrderUtils,
} from '@houseofcodecy/hoc-utils';
import {
	Add,
	ArrowBackIos,
	ArrowForwardIos,
	ArrowForwardIosOutlined,
} from '@mui/icons-material';
import {
	AppBar,
	Button,
	Dialog,
	Grid,
	IconButton,
	Slide,
	Toolbar,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
	isCheckout?: boolean;
	updateDeliveryMethod: (shippingMethod: IShippingMethod | undefined) => void;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} in={true} {...props} />;
});

const DeliverMethod = ({ isCheckout, updateDeliveryMethod }: Props) => {
	const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
		useState<IShippingMethod>();
	const [deliveryMethods, setDeliveryMethods] = useState<IShippingMethod[]>();
	const [showAddressDialog, setShowAddressDialog] = useState(false);

	const dataFetchedRef = useRef(false);

	useEffect(() => {
		async function fetchData() {
			await getShippingMethods().then(async (response: any) => {
				if (response.status === 200) {
					setDeliveryMethods(response.data.data as IShippingMethod[]);
					setSelectedDeliveryMethod(
						OrderUtils.getDefaultShippingMethod(
							response.data.data as IShippingMethod[]
						)
					);
					updateDeliveryMethod(
						OrderUtils.getDefaultShippingMethod(
							response.data.data as IShippingMethod[]
						)
					);
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
					endIcon={<ArrowForwardIos />}
					onClick={() => handleClickOpen()}>
					<Grid container>
						<Grid
							item
							xs={12}
							sx={{
								fontWeight: 'bold',
								fontSize: '16px',
								color: 'black',
							}}>
							{selectedDeliveryMethod?.attributes.name}
						</Grid>
						<Grid item xs={12}>
							<small>Select Collection Method</small>
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
							<h2>Select Collection Method</h2>
						</Grid>
						{deliveryMethods?.map((option) => {
							return (
								<Grid
									item
									key={option.id}
									xs={12}
									alignItems={'center'}
									sx={{ padding: '10px' }}>
									<Button
										sx={{
											borderTop: '1px solid black',
											padding: '15px',
											width: '100%',
											textAlign: 'left',
										}}
										onClick={() => {
											setSelectedDeliveryMethod(option);
											handleClose();
											updateDeliveryMethod(option);
										}}
										endIcon={<ArrowForwardIosOutlined />}>
										<Grid
											container
											alignItems={'center'}
											sx={{ color: 'black' }}>
											<Grid
												item
												xs={12}
												sx={{ fontWeight: 'bold', fontSize: '18px' }}>
												{option.attributes.name}
											</Grid>
										</Grid>
									</Button>
								</Grid>
							);
						})}
						<Grid item xs={12}>
							<Button
								variant='contained'
								endIcon={<Add />}
								sx={{ width: '100%', padding: '15px' }}>
								Add New Address
							</Button>
						</Grid>
					</Grid>
				</Dialog>
			</Grid>
		</Grid>
	);
};

export default DeliverMethod;
