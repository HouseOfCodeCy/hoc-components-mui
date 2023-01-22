import {
	getCart,
	ICartItemBody,
	ICartItemResponse,
	ICartResponse,
	ProductUtils,
	updateCartItem,
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
		const tmpCartItem: ICartItemBody = {
			quantity: tmpQuantity,
			price: ProductUtils.calculatePriceWithQuantity(
				cartItem.attributes.product.data.attributes.price,
				tmpQuantity
			),
			product: cartItem.attributes.product.data,
			cart: cartItem.attributes.cart.data,
			product_discount: cartItem.attributes.product_discount?.data,
		};
		await updateCartItem(`${cartItem.id}`, tmpCartItem).then(() => {
			getCart(`${cart?.id}`).then((responseData: any) => {
				const resData: ICartResponse = responseData?.data.data;
				localStorage.setItem('cardIt', `${resData.id}`);
				updateCart(resData);
			});
		});
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
							disabled={cartItem.attributes.quantity === 1}
							onClick={async () => {
								const tmpQuantity = ProductUtils.quantityHandle(
									cartItem.attributes.quantity,
									false
								);
								updateCartAndCartItem(tmpQuantity);
							}}>
							<RemoveCircleOutline sx={{ fontSize: 36 }} />
						</IconButton>
					</Grid>
					<Grid item sx={{ fontSize: '30px' }}>
						{cartItem.attributes.quantity}
					</Grid>
					<Grid item>
						<IconButton
							disabled={cartItem.attributes.quantity === 9}
							sx={{ fontSize: '30px' }}
							onClick={async () => {
								const tmpQuantity = ProductUtils.quantityHandle(
									cartItem.attributes.quantity,
									true
								);
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
					disabled={cartItem.attributes.quantity === 1}
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
