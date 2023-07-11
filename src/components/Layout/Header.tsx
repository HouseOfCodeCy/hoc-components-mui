import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	CommonUtils,
	IAddress,
	ICartResponse,
	ICategoryLevel1,
	IUserFlat,
	ShopConfigurationInterface,
} from '@houseofcodecy/hoc-utils';
import { Grid, IconButton, Link } from '@mui/material';
import { orange, red } from '@mui/material/colors';
import { isNull, isUndefined } from 'lodash';
import React from 'react';
import HNavigation from '../common/HNavigation';
import HNavigationDesktop from '../common/HNavigationDesktop';

interface Props {
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
	shopConfiguration: ShopConfigurationInterface;
	categoriesLevel1: ICategoryLevel1[];
	user: IUserFlat | null | undefined;
	cart: ICartResponse | null;
	removeUser: () => void;
	updateCart: (cart: ICartResponse | null) => void;
	updateShippingAddress: (address: IAddress | null) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	packageInfo: any;
	RenderImageLogo: () => JSX.Element;
	showCartOnFooter: boolean;
	setShowCartOnFooter: (showCart: boolean) => void;
	isScrolled: boolean;
	router: any;
}

const HeaderComponent = ({
	mediaQuery,
	shopConfiguration,
	categoriesLevel1,
	user,
	cart,
	removeUser,
	updateCart,
	updateShippingAddress,
	showCartOnFooter,
	setIsAuthenticated,
	packageInfo,
	RenderImageLogo,
	setShowCartOnFooter,
	isScrolled,
	router,
}: Props) => {
	return (
		<header>
			<Grid
				container
				justifyContent={'space-between'}
				alignItems={'center'}
				sx={{
					padding: mediaQuery === 'desktop' ? '4px' : '10px',
					lineHeight: mediaQuery === 'desktop' ? '16px' : '46px',
					backgroundColor: 'black',
				}}>
				{(mediaQuery === 'desktop' ||
					mediaQuery === 'laptop' ||
					mediaQuery === 'bigScreen') && (
					<Grid item>
						<Grid
							container
							display={'flex'}
							alignItems={'center'}
							sx={{ fontWeight: 'bold' }}>
							<Grid item>
								<Link href={`mailto:${shopConfiguration.contactEmail}`}>
									<IconButton
										size='small'
										sx={{
											color: orange[50],
											display: 'flex',
											alignItems: 'center',
											columnGap: 1,
											fontSize: '12px',
										}}>
										<FontAwesomeIcon
											icon={['fas', 'at']}
											size='xl'
											color='#feb64d'
										/>
										{shopConfiguration.contactEmail}
									</IconButton>
								</Link>
							</Grid>
							<Grid item>
								<Link href={`tel:${shopConfiguration.telephone}`}>
									<IconButton
										size='small'
										sx={{
											color: orange[50],
											display: 'flex',
											alignItems: 'center',
											columnGap: 1,
											fontSize: '12px',
											fontWeight: 'bold',
										}}>
										<FontAwesomeIcon
											icon={['fas', 'phone']}
											size='xl'
											color='#feb64d'
										/>
										{CommonUtils.formatTelephoneNumber(
											shopConfiguration.telephone
										)}
									</IconButton>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				)}
				{shopConfiguration.addresses.length > 0 &&
					(mediaQuery === 'desktop' ||
						mediaQuery === 'laptop' ||
						mediaQuery === 'bigScreen') && (
						<Grid item>
							<Grid container display={'flex'} alignItems={'center'}>
								<Grid item>
									<IconButton
										size='small'
										sx={{
											color: orange[50],
											display: 'flex',
											columnGap: 1,
											alignItems: 'center',
											fontSize: '12px',
										}}>
										<FontAwesomeIcon
											icon={['fas', 'map-location']}
											size='xl'
											color='#feb64d'
										/>
										Store Locations
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					)}
				{(mediaQuery === 'mobile' || mediaQuery === 'tablet') && (
					<Grid item>
						<HNavigation
							categoriesLevel1={categoriesLevel1}
							user={user}
							cart={cart}
							removeUser={removeUser}
							updateCart={updateCart}
							updateShippingAddress={updateShippingAddress}
							setIsAuthenticated={setIsAuthenticated}
							nextRouter={router}
							packageInfo={packageInfo}
							logoImageComponent={<RenderImageLogo />}
						/>
					</Grid>
				)}
			</Grid>
			{(mediaQuery === 'desktop' ||
				mediaQuery === 'laptop' ||
				mediaQuery === 'bigScreen') && (
				<Grid
					container
					sx={{
						borderTop: '2px solid #073d69',
						borderBottom: '2px solid #073d69',
						backgroundColor: '#1a1a1a',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: isScrolled ? '60px' : '100px',
						minHeight: isScrolled ? '60px' : '100px',
						position: 'sticky',
						top: 0,
						transition: '0.3s',
					}}>
					<Grid
						item
						xs={4}
						sx={{
							pl: 3,
							cursor: 'pointer',
						}}>
						<img
							src={shopConfiguration.shopLogo}
							alt={shopConfiguration.shopShortName}
							width={!isScrolled ? 300 : 90}
							height={!isScrolled ? 80 : 40}
							title='Go to Homepage'
							onClick={() => router.push('/')}
						/>
					</Grid>
					<Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
						<HNavigationDesktop
							categoriesLevel1={categoriesLevel1}
							nextRouter={router}
							isScrolled={isScrolled}
						/>
					</Grid>
					<Grid item xs={4} sx={{ pr: 3 }}>
						<Grid
							container
							display={'flex'}
							alignItems={'center'}
							justifyContent={'flex-end'}>
							<Grid item>
								<IconButton
									title='View Cart'
									onClick={() => {
										if (
											cart?.attributes.cart_items?.data &&
											cart?.attributes.cart_items?.data.length > 0
										) {
											setShowCartOnFooter(!showCartOnFooter);
										}
									}}
									sx={{
										color: orange[300],
										display: 'flex',
										alignItems: 'center',
										columnGap: 1,
										fontSize: '16px',
									}}>
									<Grid
										container
										display={'flex'}
										alignItems={'center'}
										columnGap={1}>
										<Grid item>
											<FontAwesomeIcon icon={'shopping-bag'} size='xl' />
										</Grid>
										<Grid item sx={{ fontWeight: 'bold' }}>
											{cart?.attributes.cart_items?.data
												? cart?.attributes.cart_items?.data.length
												: 0}
											{' Items'}
										</Grid>
									</Grid>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									title='Search'
									onClick={() => {
										console.log('Search anywhere');
									}}
									sx={{
										color: orange[300],
										display: 'flex',
										alignItems: 'center',
										columnGap: 1,
										fontSize: '16px',
									}}>
									<Grid
										container
										display={'flex'}
										alignItems={'center'}
										columnGap={1}>
										<Grid item>
											<FontAwesomeIcon icon={'magnifying-glass'} size='xl' />
										</Grid>
									</Grid>
								</IconButton>
							</Grid>
							{user && (
								<Grid item>
									<Grid container>
										<Grid item>
											<IconButton
												title='View Account'
												onClick={() => router.push('/account')}
												sx={{
													color: orange[300],
													display: 'flex',
													alignItems: 'center',
													columnGap: 1,
													fontSize: '16px',
												}}>
												<FontAwesomeIcon icon='user-large' size='xl' />
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton
												title='Logout'
												onClick={() => {
													removeUser();
												}}
												sx={{
													color: red[600],
													display: 'flex',
													alignItems: 'center',
													columnGap: 1,
													fontSize: '16px',
												}}>
												<FontAwesomeIcon icon='right-from-bracket' size='xl' />
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
							)}
							{isUndefined(user) ||
								(isNull(user) && (
									<Grid item>
										<IconButton
											onClick={() => router.push('/login')}
											title='Login'
											sx={{
												color: orange[300],
												display: 'flex',
												alignItems: 'center',
												columnGap: 1,
												fontSize: '16px',
											}}>
											<FontAwesomeIcon icon='right-from-bracket' size='xl' />
										</IconButton>
									</Grid>
								))}
						</Grid>
					</Grid>
				</Grid>
			)}
		</header>
	);
};

export default HeaderComponent;
