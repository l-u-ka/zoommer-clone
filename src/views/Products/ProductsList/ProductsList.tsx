import { Product } from '@src/@types/types'
import ProductCard from '@src/components/ProductCard/ProductCard'
import PaginationButtons from '@src/features/Pagination/PaginationButtons';

interface ProductsListProps {
    products: Product[];
    totalProducts: number;
}

export default function ProductsList({products, totalProducts} : ProductsListProps) {
    
    const productCards = products.map((prod:Product)=> {
        return <ProductCard key={prod.id} product={prod}/>
    })

    return (
        <div className='w-full'>
            <div className=' w-full pl-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-auto'>{productCards}</div>
            <div className='flex justify-center mt-14'>
                  <PaginationButtons totalProducts={totalProducts as number} />
            </div>
        </div>
    )
}
