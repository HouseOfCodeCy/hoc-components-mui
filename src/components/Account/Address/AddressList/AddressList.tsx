import { AccountUtils, IAddress } from '@houseofcodecy/hoc-utils';
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
import React, { useState } from 'react';
import EditAddressDialog from '../EditAddress';

interface Props {
	addresses: IAddress[];
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const AddressList = ({ addresses, mediaQuery }: Props) => {
	const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
	const [showEditAddressDialog, setShowEditAddressDialog] = useState(false);

	const onAddressClicked = (address: IAddress) => {
		setSelectedAddress(address);
		setShowEditAddressDialog(true);
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
								primary={address.attributes.name}
								secondary={AccountUtils.printAddressAsString(address)}
								sx={{ w: 1 }}
							/>
						</ListItemButton>
						<IconButton size='large' onClick={() => console.log('')}>
							<Settings />
						</IconButton>
						{/* {address.isDefault && <Chip label='Default' sx={{ w: 1 }} />} */}
					</ListItem>
				))}
			</List>
			<Grid item xs={12}>
				<EditAddressDialog
					address={selectedAddress}
					mediaQuery={mediaQuery}
					showEditAddressDialog={showEditAddressDialog}
					setShowEditAddressDialog={setShowEditAddressDialog}
				/>
			</Grid>
		</Grid>
	);
};

export default AddressList;
