import { ProductType } from "@src/@types/types";
import ProductCard from "@src/components/ProductCard/ProductCard";
import useGetProducts from "@src/hooks/useGetProducts"
import Slider from "react-slick";
import leftArrow from '@src/assets/icons/slider-left-btn.png'
import righrArrow from '@src/assets/icons/slider-right-btn.png'
import { useMediaQuery } from "react-responsive";


export default function FeaturedTab({categoryName} : {categoryName: string}) {

    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const {products, productsLoading} = useGetProducts({categoryName});
    const featuredProducts = products.map((product:ProductType) => {
        return <ProductCard key={product.id} product={product}/>
    })


    function SampleNextArrow(props:any) {
        const { className, style, onClick } = props;
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '120px', left: '95.5%', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%' }}
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
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '120px', left: '5px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%'  }}
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
        slidesToScroll: isDesktop ? 5 : 3 ,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

    return (
      (!productsLoading && products.length > 0) && (
        <div className="relative">
            <h3 className="mb-4 text-black-main opacity-80 firago-semibold text-base leading-[20px] dark:text-dark-black-main">{categoryName}</h3>
              <Slider {...settings}>
                  {featuredProducts}
              </Slider>
        </div>
      )   
    )
}
