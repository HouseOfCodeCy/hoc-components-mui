import { ICartItemResponse, ICartResponse } from '@houseofcodecy/hoc-utils';
import { CartItemUtils } from '@houseofcodecy/hoc-utils/lib/utils';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import QuantityComponent from './QuantityComponent';

interface Props {
	cartItem?: ICartItemResponse;
	cart: ICartResponse | null;
	updateCart: (cart: ICartResponse | null) => void;
	nextRouter: any;
	showImage?: boolean;
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const ShoppingCartItem = ({
	cartItem,
	cart,
	updateCart,
	nextRouter,
	showImage = true,
	mediaQuery,
}: Props) => {
	return cartItem ? (
		<Card
			sx={{ display: 'flex', flex: '1', boxShadow: '#0000000a 0px 3px 5px' }}>
			{showImage && (
				<CardMedia
					component='img'
					sx={{
						width:
							mediaQuery === 'mobile' || mediaQuery === 'tablet' ? 120 : 90,
						objectFit: 'cover',
						cursor: 'pointer',
						padding: mediaQuery === 'mobile' || mediaQuery === 'tablet' ? 0 : 1,
					}}
					image={CartItemUtils.getCartItemMedia(cartItem)[0]}
					alt={CartItemUtils.getCartItemProduct(cartItem)?.attributes.name}
					onClick={() =>
						nextRouter.push(`/product/${cartItem.attributes.product?.data?.id}`)
					}
				/>
			)}
			<Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
				<CardContent
					sx={{ cursor: 'pointer' }}
					onClick={() =>
						nextRouter.push(
							`/product/${CartItemUtils.getCartItemProduct(cartItem)?.id}`
						)
					}>
					<Typography
						component='div'
						variant='h3'
						sx={{ fontWeight: 600, fontSize: '16px' }}>
						{CartItemUtils.getCartItemProduct(cartItem)?.attributes.name}
					</Typography>
					<Typography
						component='div'
						variant='h3'
						sx={{ fontWeight: 300, fontSize: '13px' }}>
						{CartItemUtils.getCartItemOptions(cartItem)}
					</Typography>
					<Typography
						variant='h3'
						component='div'
						sx={{ fontWeight: 500, fontSize: '16px' }}>
						{CartItemUtils.getCartItemPrice(cartItem)}(
						{cartItem.attributes.product_inventory?.data?.attributes.quantity}x)
						= €{cartItem.attributes.price}
					</Typography>
				</CardContent>
				<QuantityComponent
					cartItem={cartItem}
					cart={cart}
					updateCart={updateCart}
					mediaQuery={mediaQuery}
				/>
			</Box>
		</Card>
	) : null;
};

export default ShoppingCartItem;
