import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";

import { notFound, redirect } from "next/navigation";

import { getProduct } from "@/lib/actions/product.actions";

export default async function EditProductsPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if(!product) redirect('/admin/products');

    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

            <GoBackButton />

            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    )
}
