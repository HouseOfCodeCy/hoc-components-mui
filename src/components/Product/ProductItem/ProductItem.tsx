import {
	AccountUtils,
	CartUtils,
	ICartResponse,
	IProduct,
	IUserFlat,
	ProductUtils,
} from '@houseofcodecy/hoc-utils';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material';
import { grey, orange, red } from '@mui/material/colors';

import React, { useEffect, useState } from 'react';

interface CustomProps {
	product: IProduct;
	user: IUserFlat | undefined | null;
	addUser: (user: IUserFlat) => void;
	updateCart: (cart: ICartResponse) => void;
	cart?: ICartResponse | null;
	nextRouter: any;
}

const ProductItem = ({
	product,
	user,
	addUser,
	cart,
	updateCart,
	nextRouter,
}: CustomProps) => {
	const [isProductFavorite, setIsProductFavorite] = useState(false);

	useEffect(() => {
		if (user && user.favorite_products)
			setIsProductFavorite(
				ProductUtils.isProductFavorite(user.favorite_products, product)
			);
	}, [user]);

	/**
	 * Add/Remove a product from user favorites from hoc-utils
	 */
	const updateUserFavorites = async () => {
		if (user) {
			await ProductUtils.addProductToFavorites(
				product,
				user,
				addUser,
				!isProductFavorite
			);
		}
	};

	const addProductToCard = () => {
		if (product && user) {
			if (cart) {
				CartUtils.createCartActionsAndGetCart(cart, product, 1, updateCart);
			} else {
				CartUtils.createCartAndCartAction(
					AccountUtils.tranformUserFlatToUser(user),
					product,
					1,
					updateCart
				);
			}
		}
	};

	return (
		<Card sx={{ w: 1, display: 'flex', justifyContent: 'flex-start' }}>
			<CardMedia
				component='img'
				sx={{
					objectFit: 'contain',
					minHeight: 160,
					maxHeight: 160,
					maxWidth: 140,
					minWidth: 140,
					cursor: 'pointer',
				}}
				image={product?.attributes.mediaUrl}
				title={product?.attributes.name}
				onClick={() => {
					nextRouter.push(`/product/${product.id}`);
				}}
			/>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent
					sx={{ flex: '1 0 auto', cursor: 'pointer' }}
					onClick={() => {
						nextRouter.push(`/product/${product.id}`);
					}}>
					<Typography
						component='div'
						sx={{ fontSize: '16px', fontWeight: 'bold' }}>
						{product?.attributes?.name}
					</Typography>
					<Typography component='div' sx={{ fontSize: '14px' }}>
						€{product?.attributes.price}
					</Typography>
					<Typography variant='subtitle2' color='text.secondary'>
						Availability: {product?.attributes.stock}
					</Typography>
				</CardContent>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
					<IconButton
						aria-label='addToCart'
						size='large'
						onClick={() => addProductToCard()}>
						<AddShoppingCartIcon sx={{ color: orange[900] }} />
					</IconButton>
					<IconButton
						aria-label='favorite'
						size='large'
						onClick={() => updateUserFavorites()}>
						{isProductFavorite ? (
							<FavoriteIcon sx={{ color: red[600] }} />
						) : (
							<FavoriteBorderIcon sx={{ color: grey[700] }} />
						)}
					</IconButton>
				</Box>
			</Box>
		</Card>
	);
};

export default ProductItem;
