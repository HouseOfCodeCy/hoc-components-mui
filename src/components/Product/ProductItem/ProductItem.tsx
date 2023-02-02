import {
	AccountUtils,
	CartUtils,
	ICartResponse,
	IProduct,
	IUserFlat,
	ProductInventoryUtils,
	ProductOptions,
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

import React, { useEffect, useRef, useState } from 'react';
import ProductAvailabilityChip from '../common/ProductAvailabilityChip';

interface CustomProps {
	product: IProduct;
	user: IUserFlat | undefined | null;
	addUser: (user: IUserFlat) => void;
	updateCart: (cart: ICartResponse) => void;
	cart?: ICartResponse | null;
	nextRouter: any;
	showStockOnCategories?: boolean;
}

const ProductItem = ({
	product,
	user,
	addUser,
	cart,
	updateCart,
	nextRouter,
	showStockOnCategories = false,
}: CustomProps) => {
	const [isProductFavorite, setIsProductFavorite] = useState(false);
	const [productStock, setProductStock] = useState<ProductOptions>();

	const dataFetchedRef = useRef(false);

	useEffect(() => {
		if (user && user.favorite_products)
			setIsProductFavorite(
				ProductUtils.isProductFavorite(user.favorite_products, product)
			);
	}, [user]);

	useEffect(() => {
		async function fetchData() {
			const productInventory: ProductOptions =
				await ProductInventoryUtils.calculateProductInventory(product);
			productInventory ? setProductStock(productInventory) : undefined;
		}
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		fetchData();
	}, []);

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
		if (user) {
			if (cart) {
				CartUtils.createCartActionsAndGetCart(cart, 1, updateCart, product);
			} else {
				CartUtils.createCartAndCartAction(
					AccountUtils.tranformUserFlatToUser(user),
					1,
					updateCart,
					product
				);
			}
		} else {
			nextRouter.push('/login');
		}
	};

	return (
		<Card sx={{ w: 1, display: 'flex', justifyContent: 'flex-start' }}>
			{product?.attributes.mediaUrls && (
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
					image={product?.attributes.mediaUrls[0]}
					title={product?.attributes.name}
					onClick={() => {
						nextRouter.push(`/product/${product.id}`);
					}}
				/>
			)}
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
						{ProductUtils.printPriceRanges(product)}
					</Typography>
				</CardContent>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						pl: 1,
						pb: 1,
					}}>
					<IconButton
						aria-label='addToCart'
						size='large'
						disabled={true}
						onClick={() => {
							addProductToCard();
						}}>
						<AddShoppingCartIcon
							sx={{
								color:
									productStock?.total && productStock?.total >= 0
										? orange[900]
										: grey[400],
							}}
						/>
					</IconButton>
					<IconButton
						aria-label='favorite'
						size='large'
						onClick={() => {
							if (user) {
								updateUserFavorites();
							} else {
								nextRouter.push('/login');
							}
						}}>
						{isProductFavorite ? (
							<FavoriteIcon sx={{ color: red[600] }} />
						) : (
							<FavoriteBorderIcon sx={{ color: grey[700] }} />
						)}
					</IconButton>
					{productStock && showStockOnCategories && (
						<ProductAvailabilityChip
							label={ProductInventoryUtils.renderAvailabilityLabel(
								productStock
							)}
						/>
					)}
				</Box>
			</Box>
		</Card>
	);
};

export default ProductItem;
