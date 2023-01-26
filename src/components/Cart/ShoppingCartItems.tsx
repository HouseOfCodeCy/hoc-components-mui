import { ICartItemResponse, ICartResponse } from '@houseofcodecy/hoc-utils';
import React from 'react';
import ShoppingCartItem from './ShoppingCartItem';

interface Props {
	cartItems: ICartItemResponse[];
	cart: ICartResponse | null;
	updateCart: (cart: ICartResponse | null) => void;
	nextRouter: any;
}

const ShoppingCartItems = ({
	cartItems,
	cart,
	updateCart,
	nextRouter,
}: Props) => {
	return (
		<>
			{cartItems?.map((cartItem: ICartItemResponse) => {
				return (
					<div key={cartItem.id} className='asdasd'>
						<ShoppingCartItem
							key={cartItem.id}
							cartItem={cartItem}
							cart={cart}
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
