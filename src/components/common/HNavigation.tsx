import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import {
	faBoxesPacking,
	faContactCard,
	faHouse,
	faPeopleGroup,
	faShoppingBasket,
	faUser,
	faVoicemail,
} from '@fortawesome/free-solid-svg-icons';
import {
	IAddress,
	ICartResponse,
	ICategoryLevel1,
	IUserFlat,
	isUserLoggedIn,
	logoutUser,
} from '@houseofcodecy/hoc-utils';
import { Logout } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { blue, grey, orange } from '@mui/material/colors';
import React, { Fragment, useState } from 'react';
import { useSnackBar } from '../../providers/SnackBarProvider';

interface Props {
	categoriesLevel1: ICategoryLevel1[];
	user?: IUserFlat | null;
	cart: ICartResponse | null;
	removeUser: () => void;
	updateCart: (cart: ICartResponse | null) => void;
	updateShippingAddress: (address: IAddress | null) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	nextRouter: any;
	packageInfo: any;
	logoImageComponent: any;
}

export default function HNavigation({
	categoriesLevel1,
	user,
	cart,
	removeUser,
	updateCart,
	updateShippingAddress,
	setIsAuthenticated,
	nextRouter,
	packageInfo,
	logoImageComponent,
}: Props) {
	const [state, setState] = useState(false);
	const { showSnackBar } = useSnackBar();

	const primaryMenuItems = [
		{
			name: 'Home',
			icon: faHouse,
			url: '/',
		},
		{
			name: 'Your Cart',
			icon: faShoppingBasket,
			url: `/cart/${cart?.id}`,
			disabled: !isUserLoggedIn() || !cart,
		},
		{
			name: 'Account',
			icon: faUser,
			url: '/account',
			disabled: !isUserLoggedIn(),
		},
	];
	const secondaryMenuItems = [
		...categoriesLevel1?.map((categoryLevel1) => {
			if (
				categoryLevel1.attributes.icon &&
				categoryLevel1.attributes.icon !== ''
			) {
				return {
					name: categoryLevel1.attributes.name,
					icon: categoryLevel1.attributes.icon as IconName,
					url: `/categories/${categoryLevel1.id}`,
				};
			} else {
				return {
					name: categoryLevel1.attributes.name,
					icon: 'dollar' as IconName,
					url: `/categories/${categoryLevel1.id}`,
				};
			}
		}),
	];
	const tertiaryMenuItems = [
		{
			name: 'Who we are',
			icon: faPeopleGroup,
			url: '/#whoweare-section',
		},
		{ name: 'Bundles', icon: faBoxesPacking, url: '/#bundles' },
		{
			name: 'Subscribe',
			icon: faVoicemail,
			url: '/#subscribe-section',
		},
		{ name: 'Contact', icon: faContactCard, url: '#' },
	];

	const logoutUserFromSession = () => {
		logoutUser();
		removeUser();
		setIsAuthenticated(false);
		updateCart(null);
		updateShippingAddress(null);
		showSnackBar('Succesfully Logged Out', 'success', 'Logout');
	};

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setState(open);
		};

	const renderMenuItems = () => (
		<Box
			role='presentation'
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
			sx={{ width: 250 }}>
			<List sx={{ width: 1 }}>
				<ListItem sx={{ justifyContent: 'center', width: '100%' }}>
					{logoImageComponent}
				</ListItem>
			</List>
			<Divider />
			<List sx={{ width: 1 }}>
				{primaryMenuItems.map((menuItem) => (
					<ListItem
						sx={{ width: '100%', visibility: 'false' }}
						key={menuItem.name}
						disablePadding
						onClick={() => nextRouter.push(menuItem.url)}
						disabled={menuItem.disabled}>
						<ListItemButton>
							<ListItemIcon sx={{ color: blue[700] }}>
								<FontAwesomeIcon icon={menuItem.icon} size='xl' />
							</ListItemIcon>
							<ListItemText primary={menuItem.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List sx={{ width: 1 }}>
				{secondaryMenuItems.map((menuItem) => (
					<ListItem
						key={menuItem.name}
						disablePadding
						onClick={() => nextRouter.push(menuItem.url)}>
						<ListItemButton>
							<ListItemIcon sx={{ color: orange[700] }}>
								<FontAwesomeIcon icon={['fas', menuItem.icon]} size='xl' />
							</ListItemIcon>
							<ListItemText primary={menuItem.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List sx={{ width: 1 }}>
				{tertiaryMenuItems.map((menuItem) => (
					<ListItem
						key={menuItem.name}
						disablePadding
						onClick={() => nextRouter.push(menuItem.url)}>
						<ListItemButton>
							<ListItemIcon sx={{ color: blue[700] }}>
								<FontAwesomeIcon icon={menuItem.icon} size='xl' />
							</ListItemIcon>
							<ListItemText primary={menuItem.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List sx={[{ width: 1 }]}>
				{isUserLoggedIn() && (
					<ListItem key={'logout-user-info'}>
						<ListItemText
							primary={
								<Grid container>
									<Grid item>
										Hi, <strong>{user?.name}</strong>!
									</Grid>
								</Grid>
							}
						/>
					</ListItem>
				)}
				<ListItem disablePadding key={'logout-button-user'}>
					{!isUserLoggedIn() && (
						<ListItemButton
							sx={{
								p: 2,
								borderRadius: '5px',
								backgroundColor: '#a6ca54',
							}}
							onClick={() => {
								nextRouter.push('/login');
							}}>
							<ListItemIcon>
								<Logout sx={{ color: grey[900] }} />
							</ListItemIcon>
							<ListItemText primary={'Login'} />
						</ListItemButton>
					)}
					{isUserLoggedIn() && (
						<ListItemButton
							sx={{
								p: 2,
								borderRadius: '5px',
								backgroundColor: '#e65c52',
							}}
							onClick={() => logoutUserFromSession()}>
							<ListItemIcon>
								<Logout sx={{ color: grey[900] }} />
							</ListItemIcon>
							<ListItemText primary={'Logout'} />
						</ListItemButton>
					)}
				</ListItem>
			</List>
			<List sx={{ width: 1 }}>
				<ListItem key={'ecommerce-ui-version'} disablePadding>
					<ListItemButton>
						<ListItemText
							primary={`Version: ${packageInfo.version}`}
							sx={{ fontSize: '6', w: 1 }}
						/>
						<ListItemText
							primary={`Comp: ${packageInfo.dependencies['@houseofcodecy/hoc-components-mui']}`}
							sx={{ fontSize: '6' }}
						/>
						<ListItemText
							primary={`Utils: ${packageInfo.dependencies['@houseofcodecy/hoc-utils']}`}
							sx={{ fontSize: '6' }}
						/>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<Grid container display={'flex'} alignItems={'center'}>
			<Fragment key={'sidemenu-key'}>
				<IconButton onClick={toggleDrawer(true)} sx={{ color: orange[300] }}>
					<FontAwesomeIcon icon={'lines-leaning'} size='xl' />
				</IconButton>
				<Drawer
					anchor={'left'}
					open={state}
					onClose={toggleDrawer(false)}
					PaperProps={{
						sx: {
							backgroundColor: '#ebeaea',
							borderRadius: '0 10px 10px 0',
						},
					}}>
					{renderMenuItems()}
				</Drawer>
			</Fragment>
		</Grid>
	);
}
