import { ICartItemResponse, ICartResponse } from '@houseofcodecy/hoc-utils';
import React from 'react';
import ShoppingCartItem from './ShoppingCartItem';

interface Props {
	cartItems: ICartItemResponse[];
	cart: ICartResponse | null;
	updateCart: (cart: ICartResponse | null) => void;
	nextRouter: any;
	showImage?: boolean;
	mediaQuery: 'desktop' | 'mobile' | null;
}

const ShoppingCartItems = ({
	cartItems,
	cart,
	updateCart,
	nextRouter,
	mediaQuery,
	showImage = true,
}: Props) => {
	return (
		<>
			{cartItems?.map((cartItem: ICartItemResponse) => {
				return (
					<div key={cartItem.id}>
						<ShoppingCartItem
							key={cartItem.id}
							cartItem={cartItem}
							cart={cart}
							mediaQuery={mediaQuery}
							showImage={showImage}
							updateCart={updateCart}
							nextRouter={nextRouter}
						/>
					</div>
				);
			})}
		</>
	);
};

export default ShoppingCartItems;
