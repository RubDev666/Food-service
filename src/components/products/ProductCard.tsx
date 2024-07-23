import Image from "next/image";

import { formatCurrency, getImagePath } from "@/utils";
import AddProductButton from "./AddProductButton";
import { GetProductProps } from "@/types/components";

export default function ProductCard({ product }: GetProductProps) {
    const {_id, name, price, image, categoryId} = product;

    const imagePath = getImagePath(image);

    return (
        <div className="border bg-white">
            <Image
                width={400}
                height={500}
                src={imagePath}
                alt={`Imagen platillo ${name}`}
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(price)}
                </p>
                
                <AddProductButton product={{price, name, categoryId, image, _id: _id.toString()}} />
            </div>
        </div>
    )
}
