import {
	getOrderPaymentMethods,
	IOrderPaymentMethod,
	StatusCode,
} from '@houseofcodecy/hoc-utils';
import {
	ArrowForwardIos,
	ArrowForwardIosOutlined,
	AttachMoney,
	CreditCard,
} from '@mui/icons-material';

import { Button, Grid } from '@mui/material';
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

import SelectButton from '../../Button/SelectButton';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';

interface Props {
	setPaymentMethod: Dispatch<SetStateAction<IOrderPaymentMethod | undefined>>;
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const PaymentMethod = ({ setPaymentMethod, mediaQuery }: Props) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
		IOrderPaymentMethod | undefined
	>();
	const [paymentMethods, setPaymentMethods] = useState<IOrderPaymentMethod[]>();
	const [showDialog, setShowDialog] = useState(false);

	const dataFetchedRef = useRef(false);

	useEffect(() => {
		async function fetchData() {
			await getOrderPaymentMethods().then(async (response: any) => {
				if (response.status === StatusCode.OK) {
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

	const handleClickOpen = () => {
		setShowDialog(true);
	};

	const handleClose = () => {
		setShowDialog(false);
	};

	const renderPaymentMethod = (
		paymentMethod: IOrderPaymentMethod | undefined
	) => {
		return (
			<SelectButton
				value={paymentMethod?.attributes.displayValue}
				description={paymentMethod?.attributes.description}
				icon={renderIcon(paymentMethod)}
				mediaQuery={mediaQuery}
			/>
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
					handleClickOpen();
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
				</Grid>
			</Button>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showDialog}
					setShowDialog={setShowDialog}
					mediaQuery={mediaQuery}
					dialogHeader='Payment Methods'>
					{paymentMethods &&
						paymentMethods.length > 0 &&
						paymentMethods.map((method) => (
							<Grid
								item
								xs={12}
								sx={{ padding: '10px', borderTop: '1px solid #beb8b8' }}>
								<Button
									sx={{
										padding: '15px',
										width: '100%',
										textAlign: 'left',
									}}
									onClick={() => {
										setSelectedPaymentMethod(method);
										setPaymentMethod(method);
										handleClose();
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
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default PaymentMethod;
