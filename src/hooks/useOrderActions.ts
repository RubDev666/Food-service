import { addOrder, increaseQuantity, decreaseQuantity, removeOrder, clearOrders } from "@/store/slice/orders";
import { useAppDispatch } from "./store";
import { FetchProduct } from "@/types/global";

export const useOrderActions = () => {
    const dispatch = useAppDispatch();
    
    const addOrderAction = (data: FetchProduct) => dispatch(addOrder(data));

    const increase = (id: string) => dispatch(increaseQuantity(id));

    const decrease = (id: string) => dispatch(decreaseQuantity(id));

    const remove = (id: string) => dispatch(removeOrder(id));

    const clear = () => dispatch(clearOrders());

    return {addOrderAction, increase, decrease, remove, clear};
}
