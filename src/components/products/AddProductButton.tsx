"use client"

import { GetProductProps } from "@/types/components";
import { useOrderActions } from "@/hooks/useOrderActions";

export default function AddProductButton({ product }: GetProductProps) {
    const {addOrderAction} = useOrderActions();

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            onClick={() => addOrderAction(product)}
        >
            Agregar
        </button>
    )
}
