import { AccountUtils, IOrder, OrderUtils } from '@houseofcodecy/hoc-utils';
import { LocalShipping, Store } from '@mui/icons-material';
import React from 'react';
import CardRow from '../common/CardRow';

interface Props {
	order: IOrder;
}

const OrderShippingMethod = ({ order }: Props) => {
	const calculateShippingMethodHeading = () => {
		if (
			order &&
			order.attributes.shipping_method_option.data &&
			order.attributes.shipping_method_option.data.attributes.shipping_method
		) {
			return `${order.attributes.shipping_method_option.data.attributes.shipping_method.data.attributes.value.toUpperCase()} - ${
				order.attributes.shipping_method_option.data.attributes.name
			}`;
		}

		return 'Unknown';
	};

	const calculateShippingInformation = () => {
		let shippingInformation = '';
		if (order && order.attributes.shipping_method_option.data) {
			// if this is delivery
			if (
				order.attributes.shipping_method_option.data.attributes.shipping_method
					?.data.attributes.value === 'delivery'
			) {
				shippingInformation = AccountUtils.printAddressAsString(
					order.attributes.address.data
				);
			}
			// if this is pickup
			else if (
				order.attributes.shipping_method_option.data.attributes.shipping_method
					?.data.attributes.value === 'pickup'
			) {
				shippingInformation =
					order.attributes.shipping_method_option.data.attributes.name;
			}
		}

		return shippingInformation;
	};

	const calculateIcon = () => {
		return OrderUtils.getShippingMethodValue(order) === 'delivery'
			? LocalShipping
			: Store;
	};

	return (
		<CardRow
			heading={calculateShippingMethodHeading()}
			content={calculateShippingInformation()}
			Icon={calculateIcon()}
		/>
	);
};

export default OrderShippingMethod;
