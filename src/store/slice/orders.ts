import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreOrder } from "@/types/reduxType";
import { FetchProduct } from "@/types/global";
import { decreaseOrder, increaseOrder } from "../utils";

const initialState: StoreOrder = {
    orders: []
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<FetchProduct>) => {
            const {_id, name, price} = action.payload;
            const orders = state.orders;

            const thereOrder = increaseOrder(_id, orders);

            if(thereOrder) {
                const {index, newQuantity, newSubtotal} = thereOrder;

                state.orders[index].quantity = newQuantity;
                state.orders[index].subtotal = newSubtotal;
                
                return;
            }

            state.orders.push({
                _id,
                name,
                price,
                quantity: 1,
                subtotal: price
            });
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const orders = state.orders;

            const thereOrder = increaseOrder(id, orders);

            if(!thereOrder) return;

            const {newQuantity, newSubtotal} = thereOrder;

            state.orders = state.orders.map((order) => order._id === id ? {...order, quantity: newQuantity, subtotal: newSubtotal}: order);
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const orders = state.orders;

            const {newQuantity, newSubtotal} = decreaseOrder(id, orders);

            state.orders = state.orders.map((order) => order._id === id ? {...order, quantity: newQuantity, subtotal: newSubtotal}: order);
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            state.orders = state.orders.filter(order => order._id !== action.payload);
        },
        clearOrders: (state) => {
            state.orders = [];
        }
    }
})

export default ordersSlice.reducer;

export const {addOrder, increaseQuantity, decreaseQuantity, removeOrder, clearOrders} = ordersSlice.actions;
