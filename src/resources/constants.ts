import { IProduct } from '@houseofcodecy/hoc-utils'
import { TableColumnInterface, TableFooterColumnInterface } from '../interfaces/types'

export const PRODUCTS: IProduct[] = []

export const TABLECOLUMNS: TableColumnInterface[] = [
  {
    field: 'title',
    header: 'Title',
    rowSpan: 1,
    colSpan: 1,
  },
  {
    field: 'subTitle',
    header: 'Sub Title',
    rowSpan: 1,
    colSpan: 1,
  },
  {
    field: 'price',
    header: 'Price',
    rowSpan: 1,
    colSpan: 1,
  },
]
export const TABLEFOOTERCOLUMNS: TableFooterColumnInterface[] = [
  {
    footer: 'Totals: ',
    rowSpan: 1,
    colSpan: 3,
  },
  {
    footer: 'subTitle',
    rowSpan: 1,
    colSpan: 1,
  },
  {
    footer: 'price',
    rowSpan: 1,
    colSpan: 1,
  },
]
