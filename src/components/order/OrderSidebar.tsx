import CategoryIcon from '../ui/CategoryIcon';
import Logo from '../ui/Logo';

import { allCategories } from '@/lib/actions/category.actions';

export default async function OrderSidebar() {
    const categories = await allCategories();

    return (
        <aside className="md:w-72 md:h-screen bg-white">
            <Logo />
            
            <nav className='mt-10'>
                {categories.map(category => <CategoryIcon key={category._id} category={{_id: category._id.toString(), name: category.name, slug: category.slug, id: category.id}} />)}
            </nav>
        </aside>
    )
}
