import { OrderItem } from "@/types/global";

/*
export class UpdateOrders<O extends OrderItem> {
    id: string = '';
    orders: O[] = [];

    constructor(id: string, orders: O[]) {
        this.id = id;
        this.orders = orders;
    }

    getIndex = () => this.orders.findIndex((order) => order._id === this.id);

    increaseOrder() {
        const indexProduct = this.getIndex();
        
        if(indexProduct === -1) return null;

        const newQuantity = this.orders[indexProduct].quantity + 1;
        const newSubtotal = this.orders[indexProduct].price * newQuantity;

        return {
            index: indexProduct,
            newQuantity,
            newSubtotal
        }
    }

    decreaseOrder() {
        const indexProduct = this.getIndex();

        const newQuantity = this.orders[indexProduct].quantity - 1;
        const newSubtotal = this.orders[indexProduct].price * newQuantity;

        return {
            index: indexProduct,
            newQuantity,
            newSubtotal
        }
    }
}*/

export function increaseOrder(id: string, orders: OrderItem[]) {
    const index = getIndex(id, orders);

    if(index === -1) return null;

    const newQuantity = orders[index].quantity + 1;
    const newSubtotal = orders[index].price * newQuantity;

    return {
        index,
        newQuantity,
        newSubtotal
    }
}

export function decreaseOrder(id: string, orders: OrderItem[]) {
    const index = getIndex(id, orders);

    const newQuantity = orders[index].quantity - 1;
    const newSubtotal = orders[index].price * newQuantity;

    return {
        index,
        newQuantity,
        newSubtotal
    }
}

const getIndex = (id: string, orders: OrderItem[]) => orders.findIndex((order) => order._id === id);