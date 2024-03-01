import { ProductType } from "@src/@types/types";
import ProductCard from "@src/components/ProductCard/ProductCard";
import useGetProducts from "@src/hooks/useGetProducts";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

interface SimilarProductsProps {
    category: string;
    productId: string;
}

export default function SimilarProducts({category, productId}: SimilarProductsProps) {

    const {products} = useGetProducts({categoryName: category})
    const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);

    useEffect(()=> {
        const filteredProducts = products.filter(product => product.id !== productId);
        setSimilarProducts(filteredProducts)
    }, [products])

    const similarProductDivs = similarProducts?.map((prod) => {
        return <ProductCard key={prod.id} product={prod}/>
    })

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        swipeToSlide: true,
        arrows: false
    };

    return (
        <div>
            {(similarProducts?.length > 0) && (
                <div> 
                    <h3 className="firago-semibold text-base leading-5 text-black-08 dark:text-dark-black-8 mb-5"><FormattedMessage id="similar.products"/></h3>
                    <Slider {...settings}>
                        {similarProductDivs}
                    </Slider>
                </div>
             )}
        </div>
    )
}
