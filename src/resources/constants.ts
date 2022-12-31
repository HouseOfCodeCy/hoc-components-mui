import { Product, TableColumnInterface, TableFooterColumnInterface } from '../interfaces/types';

export const PRODUCTS:Product[] = [
	{
		id: 1,
		title: 'A simple product',
		subTitle: 'Try it you will not miss it',
		price: 12
	},
	{
		id: 2,
		title: 'A SENIOR product',
		subTitle: 'Try it you will not miss it',
		price: 14
	},
];

export const TABLECOLUMNS:TableColumnInterface[] = [
	{
		field: 'title', header: 'Title', rowSpan: 1, colSpan: 1
	},
	{
		field: 'subTitle', header: 'Sub Title', rowSpan: 1, colSpan: 1
	},
	{
		field: 'price', header: 'Price', rowSpan: 1, colSpan: 1
	},
];
export const TABLEFOOTERCOLUMNS:TableFooterColumnInterface[] = [
	{
		footer: 'Totals: ',  rowSpan: 1, colSpan: 3
	},
	{
		footer: 'subTitle',  rowSpan: 1, colSpan: 1
	},
	{
		footer: 'price', rowSpan: 1, colSpan: 1
	},
];