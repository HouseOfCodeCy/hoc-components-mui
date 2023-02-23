import {
	IAddress,
	ICartResponse,
	IProductCategoryParent,
	isUserLoggedIn,
	IUserFlat,
	logoutUser,
} from '@houseofcodecy/hoc-utils';
import {
	AccountBox,
	ContactMail,
	EmojiPeople,
	Home,
	Inventory,
	Logout,
	Newspaper,
	PetsOutlined,
	ShoppingBasket,
	ShoppingCart,
} from '@mui/icons-material';
import Menu from '@mui/icons-material/Menu';
import { Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { blue, grey, orange } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { Fragment, useState } from 'react';
import { useSnackBar } from '../../providers/SnackBarProvider';

interface Props {
	parentCategories: IProductCategoryParent[];
	user?: IUserFlat | null;
	cart: ICartResponse | null;
	removeUser: () => void;
	updateCart: (cart: ICartResponse | null) => void;
	updateShippingAddress: (address: IAddress | null) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	nextRouter: any;
	packageInfo: any;
}

export default function HNavigation({
	parentCategories,
	user,
	cart,
	removeUser,
	updateCart,
	updateShippingAddress,
	setIsAuthenticated,
	nextRouter,
	packageInfo,
}: Props) {
	const [state, setState] = useState(false);
	const { showSnackBar } = useSnackBar();

	const primaryMenuItems = [
		{ name: 'Home', icon: <Home />, url: '/' },
		{
			name: 'Your Cart',
			icon: <ShoppingCart />,
			url: `/cart/${cart?.id}`,
			disabled: !isUserLoggedIn() || !cart,
		},
		{
			name: 'Account',
			icon: <AccountBox />,
			url: '/account',
			disabled: !isUserLoggedIn(),
		},
	];
	const secondaryMenuItems = [
		...parentCategories?.map((categoryParent) => {
			if (
				categoryParent.attributes.icon &&
				categoryParent.attributes.icon !== ''
			) {
			}
			return {
				name: categoryParent.attributes.name,
				icon: <PetsOutlined />,
				url: `/categories/${categoryParent.id}`,
			};
		}),
	];
	const tertiaryMenuItems = [
		{
			name: 'Who we are',
			icon: <EmojiPeople />,
			url: '/#whoweare-section',
		},
		{ name: 'Bundles', icon: <Inventory />, url: '/#bundles' },
		{
			name: 'Subscribe',
			icon: <Newspaper />,
			url: '/#subscribe-section',
		},
		{ name: 'Contact', icon: <ContactMail />, url: '#' },
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
					<ShoppingBasket sx={{ fontSize: 80, color: orange[700] }} />
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
								{menuItem.icon}
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
							<ListItemIcon sx={{ color: blue[700] }}>
								{menuItem.icon}
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
								{menuItem.icon}
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
				<IconButton onClick={toggleDrawer(true)}>
					<Menu fontSize={'large'} sx={{ color: orange[300] }} />
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
