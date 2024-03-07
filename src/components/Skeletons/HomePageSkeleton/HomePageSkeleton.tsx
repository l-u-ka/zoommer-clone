import { Skeleton} from "antd"
import { useMediaQuery } from "react-responsive";
import leftArrow from '@src/assets/icons/slider-left-btn.png'
import righrArrow from '@src/assets/icons/slider-right-btn.png'
import Slider from "react-slick";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

export default function HomePageSkeleton() {

    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isMobile = useMediaQuery({minWidth: 768});

    function SampleNextArrow(props:any) {
        const { className, style, onClick } = props;
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '50%', right: '10px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%' }}
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
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '50%', left: '10px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%'  }}
            onClick={onClick}
            src={leftArrow}
          />
        );
      }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isDesktop ? 1 : isMobile ? 3 : 2,
        slidesToScroll: isDesktop ? 1 : isMobile ? 3 : 2,
        swipeToSlide: true,
        arrows: isDesktop ? true : false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const prodSkeletons = [];
    for (let i=0; i<3; i++) prodSkeletons.push(<ProductCardSkeleton key={i}/>)

  return (
    <div className=''>
        <div className="flex justify-between">
            <div className=" hidden h-fit lg:grid min-w-[246px] rounded-xl dark:bg-dark-white-400 transition-colors duration-300 ease-in-out grid-cols-1">
                <Skeleton.Node children={false} active style={{height: '260px', minWidth: '100%', borderRadius: '12px'}} />
            </div>
            <div className='w-full lg:w-[750px] xl:w-[850xp] min-h-48 md:min-h-72 lg:ml-auto relative grid grid-cols-1'>
                {<Skeleton.Node children={false} active style={{width: '100%', height: '100%', borderRadius: '12px'}}/>}
            </div>
        </div>
    </div>
  )
}
