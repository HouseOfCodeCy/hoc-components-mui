import { IShippingMethodOption } from '@houseofcodecy/hoc-utils';
import {
	ArrowForwardIos,
	ArrowForwardIosOutlined,
	LocalShipping,
	LocationOn,
	LockClock,
	Store,
} from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SelectButton from '../Button/SelectButton';
import FullScreenDialog from '../common/Dialog/FullScreenDialog';

interface Props {
	isCheckout?: boolean;
	shippingMethodValue?: string;
	shippingMethodOptions?: IShippingMethodOption[];
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
	updateShippingMethodOption: (
		shippingMethodOption: IShippingMethodOption | undefined
	) => void;
}

const DeliverMethodOptions = ({
	shippingMethodOptions,
	shippingMethodValue,
	updateShippingMethodOption,
	mediaQuery,
}: Props) => {
	const [selectedShippingMethodOption, setSelectedShippingMethodOption] =
		useState<IShippingMethodOption>();
	const [showAddressDialog, setShowAddressDialog] = useState(false);

	useEffect(() => {
		if (shippingMethodOptions && shippingMethodOptions.length > 0) {
			setSelectedShippingMethodOption(shippingMethodOptions[0]);
			updateShippingMethodOption(shippingMethodOptions[0]);
		}
	}, [shippingMethodOptions]);

	const handleClickOpen = () => {
		setShowAddressDialog(true);
	};

	const handleClose = () => {
		setShowAddressDialog(false);
	};

	const renderShippingMethod = (
		shippingMethodOption: IShippingMethodOption | undefined
	) => {
		return (
			<SelectButton
				value={shippingMethodOption?.attributes.name}
				description={shippingMethodOption?.attributes.description}
				iconDescription={renderIconDescription()}
				icon={renderIcon()}
			/>
		);
	};

	const renderIcon = () => {
		if (shippingMethodValue) {
			if (shippingMethodValue === 'pickup') {
				return <Store />;
			} else {
				return <LocalShipping />;
			}
		}
		return <LocalShipping />;
	};

	const renderIconDescription = () => {
		if (shippingMethodValue) {
			if (shippingMethodValue === 'pickup') {
				return <LocationOn />;
			} else {
				return <LockClock />;
			}
		}
		return <LocationOn />;
	};

	return (
		<Grid container sx={{ padding: '5px' }}>
			<Grid item xs={12} sx={{ paddingBottom: '10px' }}>
				<Button
					sx={{
						border: '1px solid #CBBEB5',
						borderRadius: '10px',
						padding: '15px',
						width: '100%',
						textAlign: 'left',
					}}
					endIcon={<ArrowForwardIos />}
					onClick={() => handleClickOpen()}>
					<Grid container>
						<Grid
							item
							xs={12}
							sx={{
								fontWeight: 'bold',
								fontSize: '16px',
								color: 'black',
							}}>
							{renderShippingMethod(selectedShippingMethodOption)}
						</Grid>
						<Grid item xs={12}>
							<small>
								Select {shippingMethodValue === 'pickup' ? 'Store' : 'Delivery'}{' '}
								Option
							</small>
						</Grid>
					</Grid>
				</Button>
			</Grid>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showAddressDialog}
					mediaQuery={mediaQuery}
					setShowDialog={setShowAddressDialog}
					dialogHeader='Select Collection Method'>
					{shippingMethodOptions?.map((option) => {
						return (
							<Grid
								item
								key={option.id}
								xs={12}
								alignItems={'center'}
								sx={{ padding: '10px', borderTop: '1px solid #beb8b8' }}>
								<Button
									sx={{
										padding: '15px',
										width: '100%',
										textAlign: 'left',
									}}
									onClick={() => {
										setSelectedShippingMethodOption(option);
										handleClose();
										updateShippingMethodOption(option);
									}}
									endIcon={<ArrowForwardIosOutlined />}>
									<Grid container alignItems={'center'} sx={{ color: 'black' }}>
										<Grid
											item
											xs={12}
											sx={{ fontWeight: 'bold', fontSize: '18px' }}>
											{renderShippingMethod(option)}
										</Grid>
									</Grid>
								</Button>
							</Grid>
						);
					})}
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default DeliverMethodOptions;
