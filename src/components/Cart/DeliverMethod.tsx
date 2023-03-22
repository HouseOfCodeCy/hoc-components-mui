import {
	getShippingMethods,
	IShippingMethod,
	OrderUtils,
	StatusCode,
} from '@houseofcodecy/hoc-utils';
import {
	ArrowForwardIos,
	ArrowForwardIosOutlined,
	LocalShipping,
	Store,
} from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SelectButton from '../Button/SelectButton';
import FullScreenDialog from '../common/Dialog/FullScreenDialog';

interface Props {
	isCheckout?: boolean;
	updateDeliveryMethod: (shippingMethod: IShippingMethod | undefined) => void;
	mediaQuery: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const DeliverMethod = ({
	isCheckout,
	updateDeliveryMethod,
	mediaQuery,
}: Props) => {
	const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
		useState<IShippingMethod>();
	const [deliveryMethods, setDeliveryMethods] = useState<IShippingMethod[]>();
	const [showAddressDialog, setShowAddressDialog] = useState(false);

	const dataFetchedRef = useRef(false);

	useEffect(() => {
		async function fetchData() {
			await getShippingMethods().then(async (response: any) => {
				if (response.status === StatusCode.OK) {
					setDeliveryMethods(response.data.data as IShippingMethod[]);
					setSelectedDeliveryMethod(
						OrderUtils.getDefaultShippingMethod(
							response.data.data as IShippingMethod[]
						)
					);
					updateDeliveryMethod(
						OrderUtils.getDefaultShippingMethod(
							response.data.data as IShippingMethod[]
						)
					);
				}
			});
		}
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		fetchData();
	}, []);

	const handleClickOpen = () => {
		setShowAddressDialog(true);
	};

	const handleClose = () => {
		setShowAddressDialog(false);
	};

	const renderShippingMethod = (
		shippingMethod: IShippingMethod | undefined
	) => {
		return (
			<SelectButton
				value={shippingMethod?.attributes.displayValue}
				icon={renderIcon(shippingMethod)}
				mediaQuery={mediaQuery}
			/>
		);
	};

	const renderIcon = (shippingMethod: IShippingMethod | undefined) => {
		if (shippingMethod) {
			if (shippingMethod.attributes.value === 'pickup') {
				return <Store />;
			} else {
				return <LocalShipping />;
			}
		}
		return <LocalShipping />;
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
							{renderShippingMethod(selectedDeliveryMethod)}
						</Grid>
						<Grid item xs={12}>
							<small>Select Collection Method</small>
						</Grid>
					</Grid>
				</Button>
			</Grid>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showAddressDialog}
					setShowDialog={setShowAddressDialog}
					mediaQuery={mediaQuery}
					dialogHeader='Select Collection Method'>
					{deliveryMethods?.map((option) => {
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
										setSelectedDeliveryMethod(option);
										handleClose();
										updateDeliveryMethod(option);
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

export default DeliverMethod;
