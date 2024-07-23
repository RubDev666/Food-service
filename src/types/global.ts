export type Product = {
    name: string;
    price: number;
    image: string;
    categoryId: number;
}

export interface FetchProduct extends Product {
    _id: string;
}

export type Category = {
    slug: string;
    name: string;
}

export interface FetchCategory extends Category {
    id: number;
    _id: string;
}

export type OrderItem = Pick<FetchProduct, '_id' | 'name' | 'price'> & {
    quantity: number;
    subtotal: number;
} 

export type CreateOrder = {
    name: string;
    total: number;
    isReady: boolean;
    orders: Pick<OrderItem, '_id' | 'price' | 'quantity' | 'subtotal'>[];
}

export interface PreFetchOrder extends CreateOrder {
    _id: string;
}

export type FetchOrder = Pick<CreateOrder, 'isReady' | 'name' | 'total'> & {
    orders: OrderItem[];
    _id: string;
}
