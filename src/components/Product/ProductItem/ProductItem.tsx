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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
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
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const ProductItem = ({
	product,
	user,
	addUser,
	cart,
	updateCart,
	nextRouter,
	showStockOnCategories = false,
	mediaQuery = 'mobile',
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
		<Card
			sx={{
				w: 1,
				display: 'flex',
				justifyContent: 'flex-start',
				minHeight: '220px',
			}}>
			{product?.attributes.mediaUrls && (
				<CardMedia
					component='img'
					sx={{
						objectFit: 'contain',
						textAlign: 'center',
						minHeight: mediaQuery === 'laptop' ? 180 : 210,
						maxHeight: mediaQuery === 'laptop' ? 180 : 210,
						maxWidth: mediaQuery === 'laptop' ? 140 : 160,
						minWidth: mediaQuery === 'laptop' ? 140 : 160,
						cursor: 'pointer',
					}}
					image={product?.attributes.mediaUrls[0]}
					title={product?.attributes.name}
					onClick={() => {
						nextRouter.push(`/product/${product.id}`);
					}}
				/>
			)}
			<Box sx={{ display: 'flex', flexDirection: 'column', w: 1 }}>
				<CardContent
					sx={{ flex: '1 0 auto', cursor: 'pointer' }}
					onClick={() => {
						nextRouter.push(`/product/${product.id}`);
					}}>
					<Grid container>
						<Grid
							item
							xs={12}
							sx={{
								fontSize:
									mediaQuery === 'mobile' || mediaQuery === 'tablet'
										? '16px'
										: mediaQuery === 'laptop'
										? '18px'
										: '20px',
								fontWeight: 'bold',
								textAlign: 'left',
							}}>
							{product?.attributes?.name}
						</Grid>
						{/* <Grid item xs={12} sx={{ fontSize: '14px' }}>
							{ProductUtils.printPriceRanges(product)}
						</Grid> */}
					</Grid>
				</CardContent>
				<Grid
					container
					display={'flex'}
					justifyContent={'space-around'}
					alignItems={'center'}>
					<Grid
						item
						sx={{ fontSize: '24px', color: orange[900], fontWeight: 'bold' }}>
						{ProductUtils.printPriceRanges(product)}
					</Grid>
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
				</Grid>
			</Box>
		</Card>
	);
};

export default ProductItem;
