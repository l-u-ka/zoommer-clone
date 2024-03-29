import { Product } from "@src/@types/types";
import { useMediaQuery } from "react-responsive";
import { Skeleton } from "antd";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import ProductCardSkeleton from "@src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton";
import ProductCard from "@src/components/ProductCard/ProductCard";
import useGetProducts from "@src/hooks/useGetProducts"
import Slider from "react-slick";
import leftArrow from '@src/assets/icons/slider-left-btn.png'
import righrArrow from '@src/assets/icons/slider-right-btn.png'

export default function FeaturedTab({categoryName} : {categoryName: string}) {

    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const navigate = useNavigate();
    const {products, productsLoading} = useGetProducts({categoryName});  
    const featuredProducts = products.map((product:Product) => {
        return <ProductCard key={product.id} product={product}/>
    })
    const featuredProductSkeletons  = [];
    for (let i=0; i<5; i++) featuredProductSkeletons.push(<ProductCardSkeleton key={i}/>);
    

    function SampleNextArrow(props:any) {
        const { className, style, onClick } = props;
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '120px', right: '0px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%' }}
            onClick={onClick}
            src={righrArrow}
          />
        );
      }
      
      function SamplePrevArrow(props:any) {
        const { className, style, onClick } = props;
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '120px', left: '0px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%'  }}
            onClick={onClick}
            src={leftArrow}
          />
        );
      }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isDesktop ? 5 : 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

    return (
      // products.length > 0 && (
        <div>
          {productsLoading ? <div className="mt-[60px]">
              <div className="mb-4">
                <Skeleton.Input active/>
              </div>
              <Slider {...settings}>
                  {featuredProductSkeletons}
              </Slider>
            </div>
              : (products.length > 0) && (
            <div className="mt-[60px]">
              <div className="mb-4 flex justify-between">
                <h3 className="text-black-main opacity-80 firago-semibold text-base leading-[20px] dark:text-dark-black-main">{categoryName}</h3>
                <h3 onClick={()=>{navigate(`/products/${categoryName}`)}} className="firago-bold text-sm leading-[17px] cursor-pointer text-orange-main dark:text-text-dark-orange-main transition-all duration-300 ease-in-out"><FormattedMessage id="view.all"/></h3>
              </div>
              <Slider {...settings}>
                  {featuredProducts}
              </Slider>
            </div>)
          }
              
        </div>
      //)   
    )
}
