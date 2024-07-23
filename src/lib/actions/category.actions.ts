"use server";

import { connectToDB } from "../mongoose";
import CategoriesModel from "../models/categories";
import { FetchCategory } from "@/types/global";

export async function allCategories() {
    connectToDB();

    const categories: FetchCategory[] = await CategoriesModel.find({});

    return categories;
}
