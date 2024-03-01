import { ProductType } from '@src/@types/types'
import ProductCard from '@src/components/ProductCard/ProductCard'
import PaginationButtons from '@src/features/Pagination/PaginationButtons';

interface ProductsListProps {
    products: ProductType[];
    totalProducts: number;
}

export default function ProductsList({products, totalProducts} : ProductsListProps) {
    
    const productCards = products.map((prod:ProductType)=> {
        return <ProductCard key={prod.id} product={prod}/>
    })

    return (
        <div>
            <div className=' w-full pl-8 lg:w-[760px] xl:w-[800px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-auto'>{productCards}</div>
            <div className='flex justify-center mt-14'>
                  <PaginationButtons totalProducts={totalProducts as number} />
            </div>
        </div>
    )
}
