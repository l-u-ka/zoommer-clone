import { ProductCategory } from '@src/@types/types';
import useGetCategories from '@src/hooks/useGetCategories';
import FeaturedTab from './FeaturedTab/FeaturedTab';

export default function Featured() {

    const {categories} = useGetCategories();
    const featuredTabs = categories.map((cat:ProductCategory)=> {
      return <FeaturedTab key={cat.id} categoryName={cat.name}/>
    })
    const startIndex = Math.floor(Math.random() * (featuredTabs.length - 3));

    return (
        <div className="grid grid-cols-1">
            {featuredTabs.slice(startIndex, startIndex + 3)}
        </div>
    )
}
