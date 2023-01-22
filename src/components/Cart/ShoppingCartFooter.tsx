import { CartUtils, ICartResponse, IUserFlat } from '@houseofcodecy/hoc-utils';
import { ShoppingCart } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import React from 'react';

interface Props {
	cart: ICartResponse | null;
	user: IUserFlat | null | undefined;
	showCartOnFooter: boolean;
	showCart: (show: boolean) => void;
	nextRouter: any;
}

const ShoppingCartFooter = ({
	cart,
	showCart,
	showCartOnFooter,
	user,
	nextRouter,
}: Props) => {
	const isCheckout = nextRouter.asPath === '/checkout' ? true : false;
	const isCartPath = nextRouter.asPath.includes('/cart') ? true : false;

	return cart &&
		cart.attributes.cart_items &&
		user &&
		showCartOnFooter &&
		!isCartPath &&
		!isCheckout ? (
		<Box sx={{ minHeight: '60px' }} onClick={() => showCart(true)}>
			<Grid
				container
				justifyContent={'space-evenly'}
				alignItems={'center'}
				sx={{
					position: 'fixed',
					bottom: 0,
					w: '100%',
					borderRadius: '10px 10px 0px 0px',
					minHeight: '60px',
					height: '60px',
					background: '#e0cd3c',
					bt: '1px solid black',
					boxShadow: '#64646f33 0px 7px 29px 0px',
				}}>
				<Grid item xs={3}>
					<IconButton sx={{ color: grey[900] }}>
						<ShoppingCart fontSize='large' />
					</IconButton>
				</Grid>
				<Grid item xs={5} sx={{}}>
					Cart
				</Grid>
				<Grid
					item
					xs={3}
					sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'right' }}>
					€{CartUtils.calculateTotalPrice(cart.attributes.cart_items?.data)}
				</Grid>
			</Grid>
		</Box>
	) : (
		<Grid container sx={{ minHeight: '65px' }}></Grid>
	);
};

export default ShoppingCartFooter;
