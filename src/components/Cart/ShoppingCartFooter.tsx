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
	urlsNotToShow?: string[];
}

const ShoppingCartFooter = ({
	cart,
	showCart,
	showCartOnFooter,
	user,
	nextRouter,
	urlsNotToShow = ['checkout', 'cart', 'account'],
}: Props) => {
	const isPageListedInListedUrls = urlsNotToShow.some((url) => {
		if (nextRouter.asPath.includes(`/${url}`)) {
			return true;
		}
		return false;
	});
	console.log(isPageListedInListedUrls);

	return cart &&
		cart?.attributes?.cart_items &&
		user &&
		showCartOnFooter &&
		!isPageListedInListedUrls ? (
		<Box sx={{ minHeight: '60px' }} onClick={() => showCart(true)}>
			<Grid
				container
				justifyContent={'space-between'}
				alignItems={'center'}
				sx={{
					position: 'fixed',
					bottom: 0,
					w: '100%',
					borderRadius: '10px 10px 0px 0px',
					minHeight: '60px',
					height: '60px',
					p: 1,
					background: '#e0cd3c',
					bt: '1px solid black',
					boxShadow: '#64646f33 0px 7px 29px 0px',
				}}>
				<Grid item>
					<IconButton sx={{ color: grey[900] }}>
						<ShoppingCart fontSize='large' />
					</IconButton>
				</Grid>
				<Grid item>Cart</Grid>
				<Grid
					item
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
