import {
	AccountUtils,
	CartUtils,
	ConfigurationInterface,
	ICartResponse,
	IProduct,
	IProductColor,
	IProductSize,
	IUserFlat,
} from '@houseofcodecy/hoc-utils';
import { AddShoppingCart, ShoppingCartCheckout } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { isUndefined } from 'lodash';

import React, { useState } from 'react';

interface Props {
	configuration: ConfigurationInterface;
	user: IUserFlat | null | undefined;
	authenticated: boolean;
	cart: ICartResponse | null;
	product: IProduct | null;
	nextRouter: any;
	selectedProductColor: IProductColor | undefined;
	selectedProductSize: IProductSize | undefined;
	quantity: number;
	updateCart: (cart: ICartResponse | null) => void;
}

const AddToCartButton = ({
	configuration,
	user,
	authenticated,
	cart,
	product,
	nextRouter,
	selectedProductColor,
	selectedProductSize,
	quantity,
	updateCart,
}: Props) => {
	const [loading, setLoading] = useState(false);

	const checkIfDisabled = () => {
		let mandatoryIsMissing = true;
		const productHasColors = product?.attributes.product_colors?.data?.length;
		const productHasSizes = product?.attributes.product_sizes?.data?.length;
		// check colors
		if (productHasColors && isUndefined(selectedProductColor)) {
			mandatoryIsMissing = true;
			return mandatoryIsMissing;
		} else if (productHasColors && !isUndefined(selectedProductColor)) {
			mandatoryIsMissing = false;
		} else if (!productHasColors) {
			mandatoryIsMissing = false;
		}
		// check sizes
		if (productHasSizes && isUndefined(selectedProductSize)) {
			mandatoryIsMissing = true;
			return mandatoryIsMissing;
		} else if (productHasSizes && !isUndefined(selectedProductSize)) {
			mandatoryIsMissing = false;
		} else if (!productHasSizes) {
			mandatoryIsMissing = false;
		}

		// check product stock

		return mandatoryIsMissing;
	};

	const getButtonLabel = (cart: ICartResponse | null) => {
		// check if product exists as a card action
		const cartActions = cart?.attributes.cart_items?.data;
		if (cartActions && cartActions.length > 0 && product) {
			const cartActionInCart = CartUtils.doesProductExistInCartActions(
				cartActions,
				product,
				selectedProductColor,
				selectedProductSize
			);
			if (cartActionInCart) {
				return 'Update Cart';
			} else {
				return 'Add to Cart';
			}
		}
		return 'Add to Cart';
	};

	const addToCart = async () => {
		setLoading(true);
		// if shop is configured without guestCheckout
		if (configuration?.guestCheckout) {
			if (user) {
				// push item to cart
				// if cart exists on the context
				if (cart && product) {
					// check if product exists as a card action
					const cartActions = cart.attributes.cart_items;
					if (cartActions && cartActions.data && cartActions.data.length > 0) {
						// check if product exists as a card action
						const cartActions = cart?.attributes.cart_items?.data;
						if (cartActions && cartActions.length > 0 && product) {
							const cartActionInCart = CartUtils.doesProductExistInCartActions(
								cartActions,
								product,
								selectedProductColor,
								selectedProductSize
							);

							// if product exists in cart actions
							if (cartActionInCart) {
								// update cartAction using PUT and GET Cart
								await CartUtils.updateCartActionAndGetCart(
									quantity,
									cartActionInCart,
									cart,
									updateCart
								);
							} else {
								// create a new CartItem and refresh cart
								await CartUtils.createCartActionsAndGetCart(
									cart,
									quantity,
									updateCart,
									undefined,
									selectedProductColor,
									selectedProductSize
								);
							}
							setLoading(false);
						}
					} else {
						// create a new CartItem and refresh cart
						await CartUtils.createCartActionsAndGetCart(
							cart,
							quantity,
							updateCart,
							undefined,
							selectedProductColor,
							selectedProductSize
						);
						setLoading(false);
					}
				} else {
					// if the logged in user has not yet created a cart
					if (product && user) {
						await CartUtils.createCartAndCartAction(
							AccountUtils.tranformUserFlatToUser(user),
							quantity,
							updateCart,
							undefined,
							selectedProductColor,
							selectedProductSize
						);
						setLoading(false);
					}
				}
			} else {
				// if user is not logged in, redirect to login
				nextRouter.push(`/login`);
			}
		} else {
			if (cart && product) {
				// check if product exists as a card action
				const cartActions = cart.attributes.cart_items?.data;
				if (cartActions && cartActions.length > 0) {
					const cartActionInCart = CartUtils.doesProductExistInCartActions(
						cartActions,
						product
					);
					// if product exists in cart actions
					if (cartActionInCart) {
						// update cartAction using PUT and GET Cart
						await CartUtils.updateCartActionAndGetCart(
							quantity,
							cartActionInCart,
							cart,
							updateCart
						);
					} else {
						// create a new CartItem and refresh cart
						await CartUtils.createCartActionsAndGetCart(
							cart,
							quantity,
							updateCart,
							undefined,
							selectedProductColor,
							selectedProductSize
						);
					}
					setLoading(false);
				} else {
					// create a new CartItem and refresh cart
					await CartUtils.createCartActionsAndGetCart(
						cart,
						quantity,
						updateCart,
						undefined,
						selectedProductColor,
						selectedProductSize
					);
					setLoading(false);
				}
			} else {
				if (product && user) {
					await CartUtils.createCartAndCartAction(
						AccountUtils.tranformUserFlatToUser(user),
						quantity,
						updateCart,
						undefined,
						selectedProductColor,
						selectedProductSize
					);
				}
				setLoading(false);
			}
		}
	};

	return (
		<LoadingButton
			variant='contained'
			color={getButtonLabel(cart) === 'Add to Cart' ? 'warning' : 'primary'}
			onClick={addToCart}
			title='addToCart'
			disabled={checkIfDisabled()}
			sx={{
				width: '100%',
				height: '60px',
				borderRadius: '10px',
			}}
			loading={loading}
			loadingPosition='end'
			endIcon={
				getButtonLabel(cart) === 'Add to Cart' ? (
					<IconButton
						aria-label='addToCart'
						size='large'
						sx={{ color: grey[50] }}>
						<AddShoppingCart />
					</IconButton>
				) : (
					<IconButton
						aria-label='updateCart'
						size='large'
						sx={{ color: grey[50] }}>
						<ShoppingCartCheckout />
					</IconButton>
				)
			}>
			{getButtonLabel(cart)}
		</LoadingButton>
	);
};

export default AddToCartButton;
