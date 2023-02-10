import {
	getOrderPaymentMethods,
	IOrderPaymentMethod,
} from '@houseofcodecy/hoc-utils';
import {
	ArrowBackIos,
	ArrowForwardIos,
	ArrowForwardIosOutlined,
	AttachMoney,
	CreditCard,
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
import { green, grey } from '@mui/material/colors';
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

import { TransitionProps } from 'react-transition-group/Transition';

interface Props {
	setPaymentMethod: Dispatch<SetStateAction<IOrderPaymentMethod | undefined>>;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} in={true} {...props} />;
});

const PaymentMethod = ({ setPaymentMethod }: Props) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
		IOrderPaymentMethod | undefined
	>();
	const [paymentMethods, setPaymentMethods] = useState<IOrderPaymentMethod[]>();
	const [showDialog, setShowDialog] = useState(false);

	const dataFetchedRef = useRef(false);

	useEffect(() => {
		async function fetchData() {
			await getOrderPaymentMethods().then(async (response: any) => {
				if (response.status === 200) {
					setPaymentMethods(response.data.data);
					setSelectedPaymentMethod(response.data.data[0]);
					setPaymentMethod(response.data.data[0]);
				}
			});
		}
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		fetchData();
	}, []);

	const renderPaymentMethod = (
		paymentMethod: IOrderPaymentMethod | undefined
	) => {
		return (
			<IconButton sx={{ color: green[900] }}>
				{renderIcon(paymentMethod)}
				{paymentMethod?.attributes.displayValue}
			</IconButton>
		);
	};

	const renderIcon = (paymentMethod: IOrderPaymentMethod | undefined) => {
		if (paymentMethod) {
			return paymentMethod.attributes.value === 'cash' ? (
				<AttachMoney />
			) : (
				<CreditCard />
			);
		}
		return <CreditCard />;
	};

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
						}}>
						{renderPaymentMethod(selectedPaymentMethod)}
					</Grid>
					<Grid item xs={12}>
						<small>Choose Payment Method</small>
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
								{paymentMethods &&
									paymentMethods.length > 0 &&
									paymentMethods.map((method) => (
										<Grid item xs={12} sx={{ padding: '10px' }}>
											<Button
												sx={{
													borderTop: '1px solid black',
													padding: '15px',
													width: '100%',
													textAlign: 'left',
												}}
												onClick={() => {
													setSelectedPaymentMethod(method);
													setPaymentMethod(method);
													setShowDialog(false);
												}}
												endIcon={<ArrowForwardIosOutlined />}>
												<Grid container>
													<Grid
														item
														xs={12}
														sx={{ fontWeight: 'bold', fontSize: '20px' }}>
														{renderPaymentMethod(method)}
													</Grid>
												</Grid>
											</Button>
										</Grid>
									))}
							</Grid>
						</Dialog>
					</Grid>
				</Grid>
			</Button>
		</Grid>
	);
};

export default PaymentMethod;
