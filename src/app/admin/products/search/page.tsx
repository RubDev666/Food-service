import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { searchProducts } from "@/lib/actions/product.actions";
import { allCategories } from "@/lib/actions/category.actions";

export default async function SearchPage({ searchParams }: { searchParams: { search: string, page: string } }) {
    const products = await searchProducts(searchParams.search);
    const categories = await allCategories();

    return (
        <>
            <Heading>Resultados de búsqueda: {searchParams.search}</Heading>

            <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
                <ProductSearchForm />
            </div>

            {products.length ? (
                <ProductTable products={products} categories={categories} />
            ) : <p className="text-center text-lg">No hay resultados</p>}
        </>
    )
}
