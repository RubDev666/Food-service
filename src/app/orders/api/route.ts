import OrderModel from "@/lib/models/orders";
import ProductModel from "@/lib/models/products";
import { PreFetchOrder, FetchProduct, OrderItem, FetchOrder } from "@/types/global";

export const dynamic = 'force-dynamic'; //solution to error in production

export async function GET() {
    const res: PreFetchOrder[] = await OrderModel.find({isReady: true});

    let allOrders: FetchOrder [] = [];

    for(let i = 0; i < res.length; i++) {
        if(!res[i]) break;

        const { orders, _id, name, total, isReady} = res[i];

        let newOrders: OrderItem[] = [];

        for(let indexP = 0; indexP < orders.length; indexP++) {
            if(!orders[indexP]) break;

            const {_id, price, subtotal, quantity} = orders[indexP];

            const product: FetchProduct | null = await ProductModel.findById(_id);

            if(!product) break;

            newOrders = [...newOrders, {_id, price, subtotal, quantity, name: product.name}];
        }

        allOrders = [...allOrders, {_id, total, isReady, name, orders: newOrders}];
    }

    return Response.json(allOrders);
}
