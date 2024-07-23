import Link from "next/link";
import { redirect } from "next/navigation";

import { getProducts } from "@/lib/actions/product.actions";
import { allCategories } from "@/lib/actions/category.actions";

import Heading from "@/components/ui/Heading";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import ProductsPagination from "@/components/products/ProductsPagination";

export default async function ProductPage({ searchParams }: { searchParams: { page: string } }) {
    const categories = await allCategories();

    const page = +searchParams.page || 1;
    const pageSize = 10;

    if (page < 0) redirect('/admin/products');

    const { products, totalProducts } = await getProducts(page, pageSize);

    const totalPages = Math.ceil(totalProducts / pageSize);

    if (page > totalPages) redirect('/admin/products');

    return (
        <>
            <Heading>Administrar Productos</Heading>

            <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
                <Link
                    href={'/admin/products/new'}
                    className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
                >
                    Crear Producto
                </Link>

                <ProductSearchForm />
            </div>

            <ProductTable products={products} categories={categories} />

            <ProductsPagination page={page} totalPages={totalPages} />
        </>
    )
}
