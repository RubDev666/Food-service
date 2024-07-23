"use client"

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { ProductSchema } from "@/lib/schema";
import { Product } from "@/types/global";
import { createProduct } from "@/lib/actions/product.actions";

export default function AddProductForm({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const data: Product = {
            name: formData.get('name') as string,
            price: parseInt(formData.get('price') as string),
            categoryId: parseInt(formData.get('categoryId') as string),
            image: formData.get('image') as string
        }

        const result = ProductSchema.safeParse(data);

        if (!result.success) {
            result.error.issues.forEach(issue => toast.error(issue.message));

            return;
        }

        const res = await createProduct(data);

        if(res.error) return toast.error(res.error);

        toast.success('Producto Creado correctamente');
        router.push('/admin/products');
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                className="space-y-5"
                action={handleSubmit}
            >
                {children}
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Registrar Producto'
                />
            </form>
        </div>
    )
}
