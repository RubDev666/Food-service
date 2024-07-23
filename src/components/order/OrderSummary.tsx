'use client';

import { useMemo } from "react";
import { toast } from 'react-toastify';

import { formatCurrency } from "@/utils";
import { useAppSelector } from "@/hooks/store";
import ProductDetails from "./ProductDetails";
import { OrderSchema } from "@/lib/schema";
import { useOrderActions } from "@/hooks/useOrderActions";
import { CreateOrder } from "@/types/global";
import { createOrder } from "@/lib/actions/orders.actions";

export default function OrderSummary() {
    const { orders } = useAppSelector((state) => state.orders);
    const {clear} = useOrderActions();

    const total = useMemo(() => orders.reduce((total, order) => total + (order.quantity * order.price), 0), [orders]);

    const handleCreateOrder = async (formData: FormData) => {
        const data: CreateOrder = {
            name: formData.get('name') as string,
            total,
            isReady: false,
            orders
        }

        const result = OrderSchema.safeParse(data);

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return;
        }

        const res = await createOrder(data);

        if(res.error) return toast.error(res.error);

        toast.success('Pedido Realizado Correctamente');
        clear();
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {orders.length === 0 ? <p className="text-center my-10">El pedido esta vacio</p> : (
                <div className="mt-5">
                    {orders.map((order) => <ProductDetails key={order._id} item={order} />)}

                    <p className="text-2xl mt-20 text-center">
                        Total a pagar: {''}
                        <span className="font-bold">{formatCurrency(total)}</span>
                    </p>

                    <form
                        className="w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                    >
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            className="bg-white border border-gray-100 p-2 w-full"
                            name="name"
                        />

                        <input
                            type="submit"
                            className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                            value='Confirmar Pedido'
                        />
                    </form>
                </div>
            )}
        </aside>
    )
}