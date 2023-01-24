import {
	CartUtils,
	ICartItemResponse,
	ICartResponse,
	ProductUtils,
} from '@houseofcodecy/hoc-utils';
import {
	AddCircleOutline,
	DeleteOutlineRounded,
	RemoveCircleOutline,
} from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React from 'react';

interface Props {
	cartItem: ICartItemResponse;
	cart: ICartResponse | null;
	updateCart: (cart: ICartResponse) => void;
}

const QuantityComponent = ({ cartItem, cart, updateCart }: Props) => {
	const updateCartAndCartItem = async (tmpQuantity: number) => {
		const tmpCartItem: ICartItemResponse = {
			...cartItem,
			attributes: {
				...cartItem.attributes,
				price: ProductUtils.calculatePriceWithQuantity(
					cartItem.attributes.product.data.attributes.price,
					tmpQuantity
				),
			},
		};
		cart
			? await CartUtils.updateCartActionAndGetCart(
					tmpQuantity,
					tmpCartItem,
					cart,
					updateCart
			  )
			: undefined;
		// if (response.statusText === 'OK') {
		// 	console.log('Cart Actions Updated');
		// }
	};

	return (
		<Grid
			container
			sx={{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center',
			}}
			alignItems={'center'}
			justifyContent={'space-between'}>
			<Grid item>
				<Grid container alignItems={'center'}>
					<Grid item>
						<IconButton
							sx={{ m: 0 }}
							disabled={
								cartItem.attributes.product_inventory?.data.attributes
									.quantity === 1
							}
							onClick={async () => {
								const tmpQuantity = cartItem.attributes.product_inventory?.data
									.attributes.quantity
									? ProductUtils.quantityHandle(
											cartItem.attributes.product_inventory?.data.attributes
												.quantity,
											false
									  )
									: 1;
								updateCartAndCartItem(tmpQuantity);
							}}>
							<RemoveCircleOutline sx={{ fontSize: 36 }} />
						</IconButton>
					</Grid>
					<Grid item sx={{ fontSize: '30px' }}>
						{cartItem.attributes.product_inventory?.data.attributes.quantity}
					</Grid>
					<Grid item>
						<IconButton
							disabled={
								cartItem.attributes.product_inventory?.data.attributes
									.quantity === 9
							}
							sx={{ fontSize: '30px' }}
							onClick={async () => {
								const tmpQuantity = cartItem.attributes.product_inventory?.data
									.attributes.quantity
									? ProductUtils.quantityHandle(
											cartItem.attributes.product_inventory?.data.attributes
												.quantity,
											true
									  )
									: 1;
								updateCartAndCartItem(tmpQuantity);
							}}>
							<AddCircleOutline sx={{ fontSize: 36 }} />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<IconButton
					sx={{ fontSize: '30px' }}
					disabled={
						cartItem.attributes.product_inventory?.data.attributes.quantity ===
						1
					}
					onClick={async () => {
						// updateCartAndCartItem();
					}}>
					<DeleteOutlineRounded sx={{ fontSize: 36 }} color='error' />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default QuantityComponent;
