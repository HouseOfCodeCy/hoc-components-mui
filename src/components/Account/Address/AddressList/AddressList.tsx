import { AccountUtils, IAddressFlat } from '@houseofcodecy/hoc-utils';
import { LocationCity, Settings } from '@mui/icons-material';
import {
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

interface Props {
	addresses: IAddressFlat[];
}

const AddressList = ({ addresses }: Props) => {
	const onAddressClicked = (address: IAddressFlat) => {
		console.log(address);
	};
	return (
		<Grid container>
			<List sx={{ width: '100%' }}>
				{addresses.map((address) => (
					<ListItem
						sx={{ width: '100%' }}
						key={address.id}
						onClick={() => onAddressClicked(address)}>
						<ListItemButton>
							<ListItemIcon sx={{ color: blue[700] }}>
								<LocationCity sx={{ fontSize: '34px' }} />
							</ListItemIcon>
							<ListItemText
								primary={address.name}
								secondary={AccountUtils.printAddressAsStringFlat(address)}
								sx={{ w: 1 }}
							/>
						</ListItemButton>
						<IconButton size='large'>
							<Settings />
						</IconButton>
						{/* {address.isDefault && <Chip label='Default' sx={{ w: 1 }} />} */}
					</ListItem>
				))}
			</List>
		</Grid>
	);
};

export default AddressList;
