import {
	ICartResponse,
	IProductCategoryParent,
	isUserLoggedIn,
	IUserFlat,
	logoutUser,
} from '@houseofcodecy/hoc-utils';
import * as Muicon from '@mui/icons-material';
import {
	ContactMail,
	EmojiPeople,
	Inventory,
	Logout,
	Newspaper,
	ShoppingBasket,
} from '@mui/icons-material';
import Menu from '@mui/icons-material/Menu';
import { Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { blue, green, grey, orange, red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { Fragment, useState } from 'react';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import AlertController from './AlertController';

interface Props {
	parentCategories: IProductCategoryParent[];
	user?: IUserFlat | null;
	cart: ICartResponse | null;
	removeUser: () => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	nextRouter: any;
	packageInfo: any;
}

export default function HNavigation({
	parentCategories,
	user,
	cart,
	removeUser,
	setIsAuthenticated,
	nextRouter,
	packageInfo,
}: Props) {
	const [state, setState] = useState(false);
	const [showAlert, setShowAlert] = useState<boolean>(false);

	const primaryMenuItems = [
		{ name: 'Home', icon: <FaHome size={'26px'} />, url: '/#welcome-section' },
		{
			name: 'Your Cart',
			icon: <FaShoppingCart size={'26px'} />,
			url: `/cart/${cart?.id}`,
			disabled: !isUserLoggedIn() || !cart,
		},
		{
			name: 'Account',
			icon: <FaUser size={'26px'} />,
			url: '/account',
			disabled: !isUserLoggedIn(),
		},
	];
	const secondaryMenuItems = [
		...parentCategories?.map((categoryParent) => {
			let CategoryIcon = Muicon['Category'];
			if (
				categoryParent.attributes.icon &&
				categoryParent.attributes.icon !== ''
			) {
				CategoryIcon =
					Muicon[categoryParent.attributes.icon as keyof typeof Muicon];
			}
			return {
				name: categoryParent.attributes.name,
				icon: <CategoryIcon />,
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

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	const logoutUserFromSession = () => {
		logoutUser();
		removeUser();
		setIsAuthenticated(false);
		setShowAlert(true);
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
							<ListItemIcon sx={{ color: grey[700] }}>
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
				<ListItem key={'logout-user-info'}>
					<ListItemText
						primary={
							isUserLoggedIn() ? (
								<Grid container>
									<Grid item xs={12}>
										<strong>Logged in as:</strong>
									</Grid>
									<Grid item xs={12}>
										{user?.name}
									</Grid>
								</Grid>
							) : (
								'Login'
							)
						}
					/>
				</ListItem>
				<ListItem key={'logout-button-user'}>
					{!isUserLoggedIn() && (
						<ListItemButton onClick={() => nextRouter.push('/login')}>
							<ListItemIcon>
								<Logout sx={{ color: green[700] }} />
							</ListItemIcon>
							<ListItemText primary={'Login'} />
						</ListItemButton>
					)}
					{isUserLoggedIn() && (
						<ListItemButton onClick={() => logoutUserFromSession()}>
							<ListItemIcon>
								<Logout sx={{ color: red[500] }} />
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
			<AlertController
				openAlert={showAlert}
				handleClose={handleCloseAlert}
				severity={'success'}
				message={'Succesfully Logged Out'}
			/>
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
