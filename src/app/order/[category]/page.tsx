import Heading from "@/components/ui/Heading";
import { getProductsByCategory } from "@/lib/actions/product.actions";
import ProductCard from "@/components/products/ProductCard";

export default async function OrderPage({ params }: { params: { category: string } }) {
    const products = await getProductsByCategory(params.category);

    return (
        <>
            <Heading>Elige y personaliza tu pedido a continuación</Heading>

            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
                {products.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
        </>
    )
}
