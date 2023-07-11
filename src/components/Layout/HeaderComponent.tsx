import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	CommonUtils,
	ICartResponse,
	IUserFlat,
	ShopConfigurationInterface,
} from '@houseofcodecy/hoc-utils';
import { Grid, IconButton, Link, Tab, Tabs } from '@mui/material';
import { red } from '@mui/material/colors';
import { isNull, isUndefined } from 'lodash';
import React from 'react';

interface Props {
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
	shopConfiguration: ShopConfigurationInterface;
	isScrolled: boolean;
	renderImageLogo: () => JSX.Element;
	user: IUserFlat | null | undefined;
	cart: ICartResponse | null;
	removeUser: () => void;
	showCartOnFooter: boolean;
	setShowCartOnFooter: (showCart: boolean) => void;
	router: any;
}

const HeaderComponentNew = ({
	mediaQuery,
	shopConfiguration,
	user,
	cart,
	removeUser,
	showCartOnFooter,
	isScrolled,
	renderImageLogo,
	setShowCartOnFooter,
	router,
}: Props) => {
	const [value, setValue] = React.useState('destinations');

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		// setValue(event.target);
	};
	return (
		<header>
			<Grid
				container
				justifyContent={'space-between'}
				alignItems={'center'}
				sx={{
					backgroundColor: '#0B1521',
					height: isScrolled ? '80px' : '160px',
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
							<Grid item>{renderImageLogo()}</Grid>
						</Grid>
					</Grid>
				)}
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
								<Tabs
									value={value}
									textColor='secondary'
									onChange={handleChange}
									indicatorColor='secondary'
									aria-label='icon label tabs example'>
									<Tab
										value={'destinations'}
										label='Destinations'
										sx={{ color: 'white' }}
									/>
									<Tab
										value={'holidayTypes'}
										label='Holiday Types'
										sx={{ color: 'white' }}
									/>
									<Tab
										value={'offers'}
										label='Offers'
										sx={{ color: 'white' }}
									/>
									<Tab
										value={'inspiration'}
										label='Inspiration'
										sx={{ color: 'white' }}
									/>
								</Tabs>
							</Grid>
						</Grid>
					</Grid>
				)}
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
										color='secondary'
										sx={{
											display: 'flex',
											alignItems: 'center',
											columnGap: 1,
											fontSize: '16px',
										}}>
										<FontAwesomeIcon icon={['fas', 'envelope']} size='xl' />
									</IconButton>
								</Link>
							</Grid>
							<Grid item>
								<Link href={`tel:${shopConfiguration.telephone}`}>
									<IconButton
										size='small'
										color='secondary'
										sx={{
											display: 'flex',
											alignItems: 'center',
											columnGap: 1,
											fontSize: '16px',
											fontWeight: 'bold',
										}}>
										<FontAwesomeIcon icon={['fas', 'phone']} size='xl' />
										{CommonUtils.formatTelephoneNumber(
											shopConfiguration.telephone
										)}
									</IconButton>
								</Link>
							</Grid>

							<Grid item>
								<IconButton
									title='View Cart'
									color='secondary'
									onClick={() => {
										if (
											cart?.attributes.cart_items?.data &&
											cart?.attributes.cart_items?.data.length > 0
										) {
											setShowCartOnFooter(!showCartOnFooter);
										}
									}}
									sx={{
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
									color='secondary'
									onClick={() => {
										console.log('Search anywhere');
									}}
									sx={{
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
												color='secondary'
												onClick={() => router.push('/account')}
												sx={{
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
											color='secondary'
											sx={{
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
										color='secondary'
										sx={{
											display: 'flex',
											columnGap: 1,
											alignItems: 'center',
											fontSize: '12px',
										}}>
										<FontAwesomeIcon icon={['fas', 'map-location']} size='xl' />
										Store Locations
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					)}
			</Grid>
		</header>
	);
};

export default HeaderComponentNew;
