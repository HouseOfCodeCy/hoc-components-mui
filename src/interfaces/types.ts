export interface Product{
    id: number;
    title: string;
    subTitle: string;
    price: number;
    images?: ProductImage[]
}

export interface ProductImage {
    id: number;
    image: any
    alt: string;

}

export interface TableColumnInterface {
    field: string;
    header: string;
    rowSpan?: number;
    colSpan?: number;
}

export interface TableFooterColumnInterface {
    footer: string;
    rowSpan?: number;
    colSpan?: number;
}

