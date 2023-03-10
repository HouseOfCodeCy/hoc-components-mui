import {
	CartUtils,
	ICartItemResponse,
	IShippingMethodOption,
} from '@houseofcodecy/hoc-utils';
import { Grid } from '@mui/material';
import React from 'react';

interface Props {
	cartItems?: ICartItemResponse[];
	showShippingCost?: boolean;
	shippingMethodOption?: IShippingMethodOption;
}

const CartDetails = ({
	cartItems,
	showShippingCost = false,
	shippingMethodOption,
}: Props) => {
	return cartItems && cartItems?.length > 0 ? (
		<Grid
			container
			alignItems={'center'}
			justifyContent={'space-between'}
			sx={{ p: '2rem', bb: '1px solid #dcd7d7' }}
			rowGap={1}>
			<Grid item xs={12} sx={{ textAlign: 'center' }}>
				<h3>Cart Summary</h3>
			</Grid>
			<Grid item xs={12}>
				<Grid
					container
					alignItems={'center'}
					justifyContent={'space-between'}
					columnGap={2}>
					<Grid item xs={6} sx={{ textAlign: 'right' }}>
						Subtotal
					</Grid>
					<Grid item xs={5}>
						€{CartUtils.calculateTotalPrice(cartItems)}
					</Grid>
				</Grid>
			</Grid>
			{showShippingCost && shippingMethodOption && (
				<Grid item xs={12}>
					<Grid
						container
						alignItems={'center'}
						justifyContent={'space-between'}
						columnGap={2}>
						<Grid item xs={6} sx={{ textAlign: 'right' }}>
							Shipping Cost
						</Grid>
						<Grid item xs={5}>
							€{shippingMethodOption?.attributes.price || 0}
						</Grid>
					</Grid>
				</Grid>
			)}
			<Grid item xs={12}>
				<Grid
					container
					alignItems={'center'}
					justifyContent={'space-between'}
					columnGap={2}>
					<Grid item xs={6} sx={{ textAlign: 'right' }}>
						Discount
					</Grid>
					<Grid item xs={5}>
						{CartUtils.calculateTotalDiscount(cartItems)}%
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid
					container
					alignItems={'center'}
					justifyContent={'space-between'}
					sx={{ fontSize: '18px' }}
					columnGap={2}>
					<Grid item xs={6} sx={{ textAlign: 'right' }}>
						Order Total
					</Grid>
					<Grid item xs={5} sx={{ fontWeight: 'bold' }}>
						€
						{(
							(shippingMethodOption?.attributes.price || 0) +
							+CartUtils.calculateTotalPrice(cartItems)
						).toFixed(2)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	) : null;
};

export default CartDetails;
