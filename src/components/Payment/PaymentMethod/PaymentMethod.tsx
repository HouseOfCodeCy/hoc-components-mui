import {
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
import React, { Dispatch, SetStateAction, useState } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';

interface Props {
	cashEnabled: boolean;
	stripeEnabled: boolean;
	setPaymentMethod: Dispatch<SetStateAction<string>>;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} in={true} {...props} />;
});

const PaymentMethod = ({
	cashEnabled,
	stripeEnabled,
	setPaymentMethod,
}: Props) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const [showDialog, setShowDialog] = useState(false);

	return (
		<Grid container sx={{ padding: '5px' }}>
			<Button
				sx={{
					border: '1px solid #CBBEB5',
					borderRadius: '10px',
					padding: '15px',
					width: '100%',
					textAlign: 'left',
				}}
				endIcon={<ArrowForwardIos />}
				onClick={() => {
					setShowDialog(true);
				}}>
				<Grid container>
					<Grid
						item
						xs={12}
						sx={{
							fontWeight: 'bold',
							fontSize: '16px',
							color: 'black',
						}}></Grid>
					<Grid item xs={12}>
						<small>Choose Payment Method</small>
					</Grid>
					<Grid item xs={12}>
						{selectedPaymentMethod}
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
							open={showDialog}
							onClose={() => setShowDialog(false)}
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
										onClick={() => setShowDialog(false)}
										aria-label='close'>
										<ArrowBackIos />
									</IconButton>
								</Toolbar>
							</AppBar>
							<Grid container>
								<Grid item xs={12} sx={{ textAlign: 'center' }}>
									<h2>Payment Methods</h2>
								</Grid>
								{cashEnabled && (
									<Grid item xs={12} sx={{ padding: '10px' }}>
										<Button
											sx={{
												borderTop: '3px solid black',
												padding: '15px',
												width: '100%',
												textAlign: 'left',
											}}
											onClick={() => {
												setSelectedPaymentMethod('cash');
												setPaymentMethod('cash');
												setShowDialog(false);
											}}
											endIcon={<ArrowForwardIosOutlined />}>
											<Grid container>
												<Grid
													item
													xs={12}
													sx={{ fontWeight: 'bold', fontSize: '20px' }}>
													Cash
												</Grid>
											</Grid>
										</Button>
									</Grid>
								)}
								{stripeEnabled && (
									<Grid item xs={12} sx={{ padding: '10px' }}>
										<Button
											sx={{
												borderTop: '3px solid black',
												padding: '15px',
												width: '100%',
												textAlign: 'left',
											}}
											onClick={() => {
												setSelectedPaymentMethod('stripe');
												setPaymentMethod('stripe');
												setShowDialog(false);
											}}
											endIcon={<ArrowForwardIosOutlined />}>
											<Grid container>
												<Grid
													item
													xs={12}
													sx={{ fontWeight: 'bold', fontSize: '20px' }}>
													Stripe
												</Grid>
											</Grid>
										</Button>
									</Grid>
								)}
							</Grid>
						</Dialog>
					</Grid>
				</Grid>
			</Button>
		</Grid>
	);
};

export default PaymentMethod;
