import {
	getOrderStatuses,
	IOrder,
	IOrderStatus,
	StatusCode,
} from '@houseofcodecy/hoc-utils';
import {
	Cancel,
	CheckCircle,
	LocalShipping,
	LockClock,
	Shop,
	ShoppingBasket,
} from '@mui/icons-material';
import { Stack, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
	order: IOrder;
}

const OrderStepper = ({ order }: Props) => {
	const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
	const [orderActiveStep, setOrderActiveStep] = useState(0);

	const dataFetchedRef = useRef(false);

	useEffect(() => {
		async function fetchData() {
			await getOrderStatuses().then(async (response: any) => {
				if (response.status === StatusCode.OK) {
					setOrderStatuses(response.data.data);
				}
			});
		}
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		fetchData();
	}, []);

	useEffect(() => {
		if (orderStatuses.length > 0) {
			const orderStatusIndex = orderStatuses.findIndex(
				(status) => status.id === order.attributes.order_status.data.id
			);
			setOrderActiveStep(orderStatusIndex);
		}
	}, [orderStatuses]);

	const renderIcon = (step: any) => {
		if (step.attributes.value === 'SUBMITTED') {
			return ShoppingBasket;
		} else if (step.attributes.value === 'DISPATCHED') {
			return LocalShipping;
		} else if (step.attributes.value === 'CANCELLED') {
			return Cancel;
		} else if (step.attributes.value === 'COMPLETED') {
			return CheckCircle;
		} else if (step.attributes.value === 'PROCESSING') {
			return LockClock;
		}
		return Shop;
	};

	return (
		<Stack sx={{ width: '100%' }} spacing={4}>
			<Stepper alternativeLabel activeStep={orderActiveStep}>
				{orderStatuses.map((step) => (
					<Step key={step.attributes.name}>
						<StepLabel StepIconComponent={renderIcon(step)}>
							{step.attributes.name}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
};

export default OrderStepper;
