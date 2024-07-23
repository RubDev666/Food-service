"use server";

import { connectToDB } from "../mongoose";
import ProductModel from "../models/products";
import { FetchProduct, Product } from "@/types/global";
import { revalidatePath } from "next/cache";

export async function getProducts(pageNumber: number, pageSize: number) {
    connectToDB();

    // Calculate the number of posts to skip based on the page number and page size.
    //const skipAmount = (pageNumber - 1) * pageSize;

    const skipAmount = pageNumber * pageSize;
    const init = skipAmount - pageSize;

    const res = await ProductModel.find({ })
        .sort({ categoryId: 1 })
        //.skip(skipAmount)
        //.limit(pageSize)

    let products: FetchProduct[] = [];

    for(let i = init; i < skipAmount; i++) {
        if(!res[i]) break;

        products = [...products, res[i]];
    }

    const totalProducts = await ProductModel.countDocuments({ parentId: { $in: [null, undefined] } });

    //const products: FetchProduct[] = await postsQuery.exec();

    const isNext = totalProducts > skipAmount + products.length;

    return { products, isNext, totalProducts };
}

export async function searchProducts(query: string) {
    connectToDB();

    //remove accents and convert to lowercase
    const queryModified = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const products: FetchProduct[] = await ProductModel.find({});

    const productsFiltered = products.filter((po) => {
        const newName = po.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
 
        if(newName.includes(queryModified)) return po;  
    });

    return productsFiltered
}

export async function createProduct(data: Product): Promise<{[x: string]: string}> {
    try {
        connectToDB();

        await new ProductModel(data).save();

        return {}
    } catch (error: any) {
        return {error: 'Hubo un error al intentar guardar los datos...'};
    }
}

export async function getProduct(_id: string) {
    try {
        connectToDB();

        const pro: FetchProduct | null = await ProductModel.findById(_id);
    
        return pro;
    } catch (error) {
        return null;
    }
}

export async function updateProduct(id: string, newData: Product) {
    try {
        connectToDB();

        await ProductModel.findByIdAndUpdate(id, newData);

        //+revalidatePath('/admin/products');

        return {}
    } catch (error: any) {
        return {error: 'Hubo un error al intentar actualizar los datos...'};
    }
}

export async function getProductsByCategory(category: string) {
    connectToDB();

    const convert = parseInt(category);

    const products: FetchProduct[] = await ProductModel.find({categoryId: convert});

    return products;
}
