import { ArrowForwardIos, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import FullScreenDialog from '../../common/FullScreenDialog';

interface Props {
	cashEnabled: boolean;
	stripeEnabled: boolean;
	setPaymentMethod: Dispatch<SetStateAction<string>>;
}

const PaymentMethod = ({
	cashEnabled,
	stripeEnabled,
	setPaymentMethod,
}: Props) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const [showDialog, setShowDialog] = useState(false);

	return (
		<Grid container>
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
					<FullScreenDialog show={showDialog} setShowDialog={setShowDialog}>
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
					</FullScreenDialog>
				</Grid>
			</Button>
		</Grid>
	);
};

export default PaymentMethod;
