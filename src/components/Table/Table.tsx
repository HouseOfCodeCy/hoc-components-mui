import { Column } from 'primereact/column'
import { DataTable, DataTableProps as PrimeDataTableProps } from 'primereact/datatable'
import React, { FC } from 'react'
import { TableColumnInterface } from '../../interfaces/types'
import { PRODUCTS, TABLECOLUMNS } from '../../resources/constants'
import { DataTableProps } from './Table.types'

export interface CustomDataTableProps extends PrimeDataTableProps, DataTableProps {}

export const Table: FC<CustomDataTableProps> = ({ ...props }) => {
  const { data = PRODUCTS, columns = TABLECOLUMNS, header = 'Table Header' } = props

  const dynamicColumns = columns.map((col: TableColumnInterface) => {
    return <Column key={col.field} field={col.field} header={col.header} colSpan={col.colSpan} rowSpan={col.rowSpan} />
  })

  return (
    <DataTable value={data} header={header}>
      {dynamicColumns}
    </DataTable>
  )
}
