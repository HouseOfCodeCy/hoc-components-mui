import { CartUtils, ICartResponse } from '@houseofcodecy/hoc-utils';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { Button, Grid } from '@mui/material';
import React from 'react';

interface Props {
	cart: ICartResponse;
	isCheckout?: boolean;
	setShowCart: (showCart: boolean) => void;
	nextRouter: any;
	mediaQuery?: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const CartTotal = ({
	cart,
	isCheckout = false,
	setShowCart,
	nextRouter,
	mediaQuery = 'mobile',
}: Props) => {
	return cart && cart.attributes.cart_items ? (
		<Grid
			container
			justifyContent={'space-between'}
			columnGap={1}
			alignItems={'center'}
			sx={{
				boxShadow: '#11111a0d 0px 4px 16px, #11111a0d 0px 8px 32px',
				padding: '2rem',
			}}>
			<Grid item xs={6} lg={12}>
				<Grid
					container
					columnGap={2}
					sx={{ fontSize: mediaQuery === 'mobile' ? '24px' : '20px' }}>
					<Grid item xs={4} sx={{ textAlign: 'right', tWeight: 300 }}>
						Total:
					</Grid>
					<Grid item xs={6} sx={{ fontWeight: 'bold' }}>
						€{CartUtils.calculateTotalPrice(cart.attributes.cart_items.data)}
					</Grid>
				</Grid>
			</Grid>
			{!isCheckout ? (
				<Grid item xs={5} lg={12} sx={{ textAlign: 'right' }}>
					<Button
						variant='contained'
						size='large'
						sx={{
							backgroundColor: '#e0cd3c',
							color: '#212121',
							fontWeight: 'bold',
							borderColor: 'black',
							width: '100%',
							height: mediaQuery === 'mobile' ? '50px' : '46px',
						}}
						startIcon={<AccountBalanceOutlinedIcon />}
						onClick={() => {
							setShowCart(false);
							nextRouter.push(`/checkout`);
						}}>
						Checkout
					</Button>
				</Grid>
			) : null}
		</Grid>
	) : null;
};

export default CartTotal;
