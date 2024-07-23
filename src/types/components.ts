import { FetchProduct, FetchCategory, FetchOrder } from "./global"

export type ProductsTableProps = {
    products: FetchProduct[];
    categories: FetchCategory[];
}

export type ProductsPaginationProps = {
    page: number;
    totalPages: number;
}

export type GetProductProps = {
    product: FetchProduct;
}

export type OrdersProps = {
    order: FetchOrder;
}

export type CategoryIconProps = {
    category: FetchCategory;
}