import {
	CartUtils,
	CommonUtils,
	DateTypes,
	IOrder,
} from '@houseofcodecy/hoc-utils';
import { ArrowForwardIos, CardGiftcard } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { grey, orange } from '@mui/material/colors';

import React from 'react';

interface CustomProps {
	order: IOrder;
	nextRouter: any;
}

const OrderItem = ({ order, nextRouter }: CustomProps) => {
	return (
		<Card
			sx={{
				w: 1,
				display: 'flex',
				justifyContent: 'space-between',
				cursor: 'pointer',
			}}
			onClick={() => {
				nextRouter.push(`/orders/${order.id}`);
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
				<IconButton aria-label='addToCart' size='large'>
					<CardGiftcard sx={{ color: orange[700], fontSize: '52px' }} />
				</IconButton>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography
						component='div'
						sx={{ fontSize: '16px', fontWeight: 'bold' }}>
						{CommonUtils.formatDate(
							order.attributes.createdAt,
							DateTypes.DATETIME
						)}
					</Typography>
					<Typography component='div' sx={{ fontSize: '14px' }}>
						Payment Method:{' '}
						{order.attributes.order_payment_method.data.attributes.displayValue.toUpperCase()}
					</Typography>
					<Typography variant='subtitle2' color='text.secondary'>
						{order?.attributes.shipping_method_option?.data?.attributes.name}
					</Typography>
					<Typography variant='subtitle2' color='text.secondary'>
						Order Total: €
						{order?.attributes.cart?.data.attributes.cart_items
							? CartUtils.calculateTotalPrice(
									order?.attributes.cart?.data.attributes.cart_items.data
							  )
							: 'N/A'}
					</Typography>
					<Typography variant='subtitle2' color='text.secondary'>
						Status: {order.attributes.order_status.data.attributes.name}
					</Typography>
				</CardContent>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'right' }}>
				<IconButton aria-label='addToCart' size='large'>
					<ArrowForwardIos sx={{ color: grey[700], fontSize: '22px' }} />
				</IconButton>
			</Box>
		</Card>
	);
};

export default OrderItem;
