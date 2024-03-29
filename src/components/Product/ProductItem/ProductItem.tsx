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
import { grey, red } from '@mui/material/colors';

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
		showStockOnCategories && fetchData();
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
				alignItems: 'center',
				minHeight:
					mediaQuery === 'desktop'
						? 320
						: mediaQuery === 'laptop'
						? 180
						: mediaQuery === 'mobile'
						? 200
						: mediaQuery === 'tablet'
						? 250
						: 340,
				p: 1,
			}}>
			{product?.attributes.mediaUrls && (
				<CardMedia
					component='img'
					sx={{
						objectFit: 'contain',
						textAlign: 'center',
						minHeight:
							mediaQuery === 'desktop'
								? 280
								: mediaQuery === 'laptop'
								? 140
								: mediaQuery === 'mobile'
								? 160
								: mediaQuery === 'tablet'
								? 210
								: 300,
						maxHeight:
							mediaQuery === 'desktop'
								? 280
								: mediaQuery === 'laptop'
								? 140
								: mediaQuery === 'mobile'
								? 160
								: mediaQuery === 'tablet'
								? 210
								: 300,
						maxWidth:
							mediaQuery === 'desktop'
								? 280
								: mediaQuery === 'laptop'
								? 100
								: mediaQuery === 'mobile'
								? 160
								: mediaQuery === 'tablet'
								? 210
								: 300,
						minWidth:
							mediaQuery === 'desktop'
								? 280
								: mediaQuery === 'laptop'
								? 100
								: mediaQuery === 'mobile'
								? 160
								: mediaQuery === 'tablet'
								? 210
								: 300,
						cursor: 'pointer',
					}}
					image={product?.attributes.mediaUrls[0]}
					onClick={() => {
						nextRouter.push(`/product/${product.id}`);
					}}
				/>
			)}
			<Box aria-label={product?.attributes.name} sx={{ w: 1 }}>
				<CardContent
					title={product?.attributes?.name}
					sx={{
						cursor: 'pointer',
					}}>
					<Grid
						container
						display={'flex'}
						alignContent={'space-between'}
						sx={{
							minHeight:
								mediaQuery === 'desktop'
									? 200
									: mediaQuery === 'laptop'
									? 140
									: mediaQuery === 'mobile'
									? 150
									: mediaQuery === 'tablet'
									? 150
									: 220,
							maxHeight:
								mediaQuery === 'desktop'
									? 200
									: mediaQuery === 'laptop'
									? 120
									: mediaQuery === 'mobile'
									? 150
									: mediaQuery === 'tablet'
									? 150
									: 220,
							textOverflow: 'ellipsis',
							overflow: 'hidden',
						}}>
						<Grid
							item
							xs={12}
							onClick={() => {
								nextRouter.push(`/product/${product.id}`);
							}}
							sx={{
								fontSize:
									mediaQuery === 'mobile' || mediaQuery === 'tablet'
										? '16px'
										: mediaQuery === 'laptop'
										? '18px'
										: '20px',
								fontWeight: 'bolder',
								textAlign: 'left',
								maxHeight:
									mediaQuery === 'desktop'
										? 160
										: mediaQuery === 'laptop'
										? 85
										: mediaQuery === 'mobile'
										? 70
										: mediaQuery === 'tablet'
										? 80
										: 190,
								textOverflow: 'ellipsis',
								overflow: 'hidden',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
							}}>
							{product?.attributes?.name}
						</Grid>
						<Grid item xs={12} sx={{ color: '#877639' }}>
							{product.attributes.product_brand?.data.attributes.name}
						</Grid>
						<Grid item xs={12}>
							<Grid
								container
								display={'flex'}
								wrap='nowrap'
								justifyContent={'space-between'}
								alignItems={'center'}>
								<Grid
									item
									onClick={() => {
										nextRouter.push(`/product/${product.id}`);
									}}
									sx={{
										fontSize:
											mediaQuery === 'mobile'
												? '18px'
												: mediaQuery === 'laptop'
												? '14px'
												: mediaQuery === 'desktop'
												? '20px'
												: mediaQuery === 'tablet'
												? '18px'
												: '22px',
										color: '#cb913d',
										fontWeight: 'bold',
									}}>
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
						</Grid>
					</Grid>
				</CardContent>
			</Box>
		</Card>
	);
};

export default ProductItem;
