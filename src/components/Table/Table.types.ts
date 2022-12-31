import { TableColumnInterface } from '../../interfaces/types';

export interface DataTableProps {
    data: any[];
    columns: TableColumnInterface[];
    footerColumns?: TableColumnInterface[];
}