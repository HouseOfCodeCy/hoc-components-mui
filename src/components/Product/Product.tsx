import React,{FC} from 'react';
import {Product as ProductInterface} from '../../interfaces/types';

export interface ProductProps {
    product: ProductInterface;

}

export const Product: FC<ProductProps> = ({...props}) => {
	const {product} = props;

	return(
		<div className='product-component container'>
			<div className='product-info row'>
				<div className='first-column col'>
					20 Feb 2021
				</div>
				<div className='first-column col'>
					3.00 km
				</div>
				<div className='first-column col'>
					Wishlist
				</div>
				<div className='first-column col'>
					Viewed
				</div>
			</div>
			<div className="product-title row">
				<h1>{product.title}</h1>
			</div>
			<div className="product-sub-title row">
				<h3>{product.subTitle}</h3>
			</div>
		</div>    
	);
};