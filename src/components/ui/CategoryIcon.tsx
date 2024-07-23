"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';

import { CategoryIconProps } from "@/types/components";

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{category: string}>()

    return (
        <div
            className={`${category.id.toString() === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-16 h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt="Imagen Categoria"
                />
            </div>

            <Link
                className="text-xl font-bold"
                href={`/order/${category.id}`}
            >{category.name}</Link>
        </div>
    )
}
