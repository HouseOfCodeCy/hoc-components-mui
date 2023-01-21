import { CommonUtils, DateTypes, IOrderFlat } from '@houseofcodecy/hoc-utils';
import { CardGiftcard } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';

import React from 'react';

interface CustomProps {
	order: IOrderFlat;
	nextRouter: any;
}

const OrderItem = ({ order, nextRouter }: CustomProps) => {
	return (
		<Card sx={{ w: 1, display: 'flex', justifyContent: 'flex-start' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
				<IconButton aria-label='addToCart' size='large'>
					<CardGiftcard sx={{ color: orange[700], fontSize: '52px' }} />
				</IconButton>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent
					sx={{ flex: '1 0 auto', cursor: 'pointer' }}
					onClick={() => {
						nextRouter.push(`/orders/${order.id}`);
					}}>
					<Typography
						component='div'
						sx={{ fontSize: '16px', fontWeight: 'bold' }}>
						{CommonUtils.formatDate(order.createdAt, DateTypes.DATETIME)}
					</Typography>
					<Typography component='div' sx={{ fontSize: '14px' }}>
						Payment Method: {order.order_payment_method.name.toUpperCase()}
					</Typography>
					<Typography variant='subtitle2' color='text.secondary'>
						{order.shipping_method.name}
					</Typography>
					<Typography variant='subtitle2' color='text.secondary'>
						Status: {order.order_status.name}
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
};

export default OrderItem;
