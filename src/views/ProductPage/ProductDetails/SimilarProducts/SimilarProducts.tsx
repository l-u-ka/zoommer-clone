import { ProductType } from "@src/@types/types";
import ProductCard from "@src/components/ProductCard/ProductCard";
import useGetProducts from "@src/hooks/useGetProducts";
import { useEffect, useState } from "react";
import Slider from "react-slick";

interface SimilarProductsProps {
    category: string;
    productId: string;
}

export default function SimilarProducts({category, productId}: SimilarProductsProps) {

    const {products, productsLoading} = useGetProducts({categoryName: category})
    const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);

    useEffect(()=> {
        const filteredProducts = products.filter(product => product.id !== productId);
        setSimilarProducts(filteredProducts)
    }, [products])

    const similarProductDivs = similarProducts?.map((prod) => {
        return <ProductCard product={prod}/>
    })

    console.log("SIMILAR PRODUCTS: ", similarProducts)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: similarProducts?.length,
        slidesToScroll: similarProducts?.length,
        swipeToSlide: true,
        arrows: false
    };

    return (
        <div>
            {productsLoading && <h3>Loading...</h3>}
            {(!productsLoading && similarProducts?.length > 0) && (
                <Slider {...settings}>
                    {similarProductDivs}
                </Slider>
            )}
        </div>
    )
}
