import { Skeleton } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import { Product } from "@src/@types/types";
import ProductCard from "@src/components/ProductCard/ProductCard";
import ProductCardSkeleton from "@src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton";
import useGetProducts from "@src/hooks/useGetProducts";

interface SimilarProductsProps {
    category: string;
    productId: string;
}

const similarProdSkeletons:ReactNode[] = [];
for (let i = 0; i <3; i++) similarProdSkeletons.push(<ProductCardSkeleton key={i}/>)

export default function SimilarProducts({category, productId}: SimilarProductsProps) {
    const {products, productsLoading} = useGetProducts({categoryName: category})
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const isMobile = useMediaQuery({maxWidth: 480});

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile ? 2 : 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false
    };

    useEffect(()=> {
        const filteredProducts = products.filter(product => product.id !== productId);
        setSimilarProducts(filteredProducts)
    }, [products])

    const similarProductDivs = similarProducts?.map((prod) => {
        return <ProductCard key={prod.id} product={prod}/>
    })

    return (
        <div>
        {   productsLoading ? (
             <div> 
                <Skeleton.Input active block={true} size='small' style={{marginBottom: '20px'}}/>
                <Slider {...settings}>
                    {similarProdSkeletons}
                </Slider> 
            </div>) : (similarProducts?.length > 0) && (
                <div> 
                    <h3 className="firago-semibold text-base leading-5 text-black-08 dark:text-dark-black-8 mb-5"><FormattedMessage id="similar.products"/></h3>
                    <Slider {...settings}>
                        {similarProductDivs}
                    </Slider>
                </div>)    
        }
        </div>
    )
}
