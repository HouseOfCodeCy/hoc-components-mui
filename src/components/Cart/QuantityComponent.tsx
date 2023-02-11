import {
	CartItemUtils,
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
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import React, { useState } from 'react';

interface Props {
	cartItem: ICartItemResponse;
	cart: ICartResponse | null;
	updateCart: (cart: ICartResponse | null) => void;
}

const QuantityComponent = ({ cartItem, cart, updateCart }: Props) => {
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [loadingQuantity, setLoadingQuantity] = useState(false);

	const updateCartAndCartItem = async (tmpQuantity: number) => {
		setLoadingQuantity(true);
		if (cartItem) {
			const tmpCartItem: ICartItemResponse = {
				...cartItem,
				attributes: {
					...cartItem.attributes,
					price: +CartItemUtils.getCartItemPrice(cartItem, false),
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
			setLoadingQuantity(false);
		}
	};

	const deleteCartItemFromCart = async () => {
		setLoadingDelete(true);
		// if this is the last cart item in the cart
		if (cart?.attributes.cart_items?.data.length === 1) {
			await CartUtils.deleteCartItemAndProductInventoryAndCartAndGetCart(
				cartItem.id,
				`${cartItem.attributes.product_inventory?.data.id}`,
				`${cart.id}`,
				updateCart
			);
			setLoadingDelete(false);
		} else {
			cart &&
				(await CartUtils.deleteCartItemAndProductInventoryAndGetCart(
					cartItem.id,
					`${cartItem.attributes.product_inventory?.data.id}`,
					`${cart.id}`,
					updateCart
				));
			setLoadingDelete(false);
		}
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
				<Grid
					container
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}>
					<Grid item sx={{ textAlign: 'center' }}>
						<LoadingButton
							size='large'
							loadingPosition='end'
							loading={loadingQuantity}
							endIcon={
								<IconButton
									aria-label='incrementCartItem'
									size='large'
									sx={{ color: yellow[700] }}>
									<RemoveCircleOutline sx={{ fontSize: 36 }} />
								</IconButton>
							}
							disabled={
								cartItem.attributes.product_inventory?.data.attributes
									.quantity === 1
							}
							onClick={() => {
								const tmpQuantity = cartItem.attributes.product_inventory?.data
									.attributes.quantity
									? ProductUtils.quantityHandle(
											cartItem.attributes.product_inventory?.data.attributes
												.quantity,
											false
									  )
									: 1;
								updateCartAndCartItem(tmpQuantity);
							}}></LoadingButton>
					</Grid>
					<Grid item sx={{ fontSize: '30px', textAlign: 'center' }}>
						{cartItem.attributes.product_inventory?.data.attributes.quantity}
					</Grid>
					<Grid item sx={{ textAlign: 'center' }}>
						<LoadingButton
							disabled={
								cartItem.attributes.product_inventory?.data.attributes
									.quantity === 9
							}
							loading={loadingQuantity}
							size='large'
							startIcon={
								<IconButton
									aria-label='incrementCartItem'
									size='large'
									sx={{ color: yellow[700] }}>
									<AddCircleOutline sx={{ fontSize: 36 }} />{' '}
								</IconButton>
							}
							loadingPosition='start'
							onClick={() => {
								const tmpQuantity = cartItem.attributes.product_inventory?.data
									.attributes.quantity
									? ProductUtils.quantityHandle(
											cartItem.attributes.product_inventory?.data.attributes
												.quantity,
											true
									  )
									: 1;
								updateCartAndCartItem(tmpQuantity);
							}}></LoadingButton>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<LoadingButton
					size='large'
					loadingPosition='center'
					endIcon={
						<IconButton
							aria-label='deleteCartItem'
							size='large'
							sx={{ color: red[700] }}>
							<DeleteOutlineRounded sx={{ fontSize: 36 }} color='error' />
						</IconButton>
					}
					loading={loadingDelete}
					onClick={deleteCartItemFromCart}></LoadingButton>
			</Grid>
		</Grid>
	);
};

export default QuantityComponent;
