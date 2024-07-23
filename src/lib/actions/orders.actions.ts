'use server';

import { connectToDB } from "../mongoose";
import OrderModel from "../models/orders";
import { CreateOrder } from "@/types/global";

export async function createOrder(data: CreateOrder) {
    try {
        connectToDB();

        await new OrderModel(data).save();

        //manejar el error de nombres repetidos para mostrar al cliente

        return {}
    } catch (error: any) {
        return { error: 'Hubo un error al intentar guardar la orden...' };
    }
}

export async function updateOrder(id: string) {
    connectToDB();

    await OrderModel.findByIdAndUpdate(id, { isReady: true });
}
