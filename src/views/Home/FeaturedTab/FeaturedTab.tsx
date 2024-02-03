import { ProductType } from "@src/@types/types";
import ProductCard from "@src/components/ProductCard/ProductCard";
import useGetProducts from "@src/hooks/useGetProducts"
import Slider from "react-slick";
import leftArrow from '@src/assets/icons/slider-left-btn.png'
import righrArrow from '@src/assets/icons/slider-right-btn.png'
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";

export default function FeaturedTab({categoryName} : {categoryName: string}) {

    const {products} = useGetProducts({categoryName});
    const {showOverlay} = useGlobalProvider();
    const featuredProducts = products.map((product:ProductType) => {
        return <ProductCard key={product.id} product={product}/>
    })

    function SampleNextArrow(props:any) {
        const { className, style, onClick } = props;
        console.log(className, style)
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'relative', top: '-140px', left: '95.5%', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%' }}
            onClick={onClick}
            src={righrArrow}
          />
        );
      }
      
      function SamplePrevArrow(props:any) {
        const { className, style, onClick } = props;
        console.log(className, style)
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'relative', top: '200px', left: '5px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%'  }}
            onClick={onClick}
            src={leftArrow}
          />
        );
      }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

    return (
        <div>
            <h3>{categoryName}</h3>
            <Slider {...settings}>
                {featuredProducts}
            </Slider>
        </div>
    )
}
