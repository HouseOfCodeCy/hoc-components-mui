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
import { ShoppingBag } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

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
	const checkIfDisabled = () => {
		if (selectedProductColor && selectedProductSize) {
			return false;
		}
		return true;
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
		if (configuration?.addToCartNeedsAccount) {
			if (user && authenticated) {
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
			}
		}
	};

	return (
		<Button
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
			startIcon={<ShoppingBag fontSize={'large'} />}>
			{getButtonLabel(cart)}
		</Button>
	);
};

export default AddToCartButton;
