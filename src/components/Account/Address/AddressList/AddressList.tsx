import { AccountUtils, IAddressFlat } from '@houseofcodecy/hoc-utils';
import { LocationCity } from '@mui/icons-material';
import {
	Chip,
	Grid,
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
	return (
		<Grid container>
			<List sx={{ width: '100%' }}>
				{addresses.map((address) => (
					<ListItem sx={{ width: '100%' }} key={address.id}>
						<ListItemButton>
							<ListItemIcon sx={{ color: blue[700] }}>
								<LocationCity />
							</ListItemIcon>
							<ListItemText
								primary={address.name}
								secondary={AccountUtils.printAddressAsString(address)}
								sx={{ w: 1 }}
							/>
						</ListItemButton>
						{address.isDefault && <Chip label='Default' sx={{ w: 1 }} />}
					</ListItem>
				))}
			</List>
		</Grid>
	);
};

export default AddressList;
