import { ICartItemResponse, ICartResponse } from '@houseofcodecy/hoc-utils';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import QuantityComponent from './QuantityComponent';

interface Props {
	cartItem?: ICartItemResponse;
	cart: ICartResponse | null;
	updateCart: (cart: ICartResponse | null) => void;
	nextRouter: any;
}

const ShoppingCartItem = ({
	cartItem,
	cart,
	updateCart,
	nextRouter,
}: Props) => {
	return cartItem ? (
		<Card
			sx={{ display: 'flex', flex: '1', boxShadow: '#0000000a 0px 3px 5px' }}>
			<CardMedia
				component='img'
				sx={{ width: 120, objectFit: 'cover' }}
				image={cartItem.attributes.product.data.attributes.mediaUrl}
				alt='Live from space album cover'
				onClick={() =>
					nextRouter.push(`/product/${cartItem.attributes.product.data.id}`)
				}
			/>
			<Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
				<CardContent
					onClick={() =>
						nextRouter.push(`/product/${cartItem.attributes.product.data.id}`)
					}>
					<Typography
						component='div'
						variant='h3'
						sx={{ fontWeight: 600, fontSize: '22px' }}>
						{cartItem.attributes.product.data.attributes.name}
					</Typography>
					<Typography variant='h5' color='text.secondary' component='div'>
						€{cartItem.attributes.product.data.attributes.price}(
						{cartItem.attributes.product_inventory?.data.attributes.quantity}x)
						= €{cartItem.attributes.price}
					</Typography>
				</CardContent>
				<QuantityComponent
					cartItem={cartItem}
					cart={cart}
					updateCart={updateCart}
				/>
			</Box>
		</Card>
	) : null;
};

export default ShoppingCartItem;
