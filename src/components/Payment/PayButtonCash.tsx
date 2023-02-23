import {
	CartUtils,
	CheckoutUtils,
	getUser,
	IAddress,
	ICartResponse,
	IOrderPaymentMethod,
	IShippingMethod,
	IShippingMethodOption,
	IUserFlat,
	PopulateType,
	StatusCode,
} from '@houseofcodecy/hoc-utils';
import { PaymentOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

interface Props {
	user: IUserFlat | null | undefined;
	setShowCart: (showCart: boolean) => void;
	updateCart: (cart: ICartResponse | null) => void;
	addUser: (user: IUserFlat) => void;
	nextRouter: any;
	cart: ICartResponse | null;
	shippingAddress: IAddress | null;
	paymentMethod: IOrderPaymentMethod | undefined;
	shippingMethod: IShippingMethod | undefined;
	shippingMethodOption: IShippingMethodOption | undefined;
}

const PayButtonCash = ({
	user,
	setShowCart,
	updateCart,
	addUser,
	nextRouter,
	cart,
	shippingAddress,
	paymentMethod,
	shippingMethodOption,
	shippingMethod,
}: Props) => {
	const createNewOrder = async () => {
		const orderResponse: any =
			await CheckoutUtils.checkoutCartAndUpdateProductInventory({
				cart: cart,
				address: shippingAddress,
				order_payment_method: paymentMethod,
				shipping_method_option: shippingMethodOption,
				order_status: { id: 1, name: 'SUBMITTED' },
				user: user,
			});
		if (orderResponse && orderResponse.status === StatusCode.OK) {
			setShowCart(false);
			updateCart(null);
			CartUtils.removeCartIdToLocalStorage();
			getUser(`${user?.id}`, PopulateType.DEEP).then((userResponse: any) => {
				addUser(userResponse?.data);
			});
			nextRouter.push(
				`/checkout/success?orderId=${orderResponse.data.data.id}`
			);
		}
	};

	const checkIfPayIsDisabled = () => {
		let isDisabled = false;
		// if this is delivery
		if (shippingMethod?.attributes.value === 'delivery') {
			// check if the user has selected a shipping address
			if (shippingAddress) {
				isDisabled = false;
			} else {
				isDisabled = true;
			}
		}
		return isDisabled;
	};

	return (
		<Button
			id='submit'
			variant='contained'
			disabled={checkIfPayIsDisabled()}
			endIcon={<PaymentOutlined />}
			sx={{ width: '100%', padding: '15px' }}
			onClick={() => {
				createNewOrder();
			}}>
			Place Order
		</Button>
	);
};

export default PayButtonCash;
