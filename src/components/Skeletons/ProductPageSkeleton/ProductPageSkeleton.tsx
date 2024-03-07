import ProductCardSkeleton from '@src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton';
import { Skeleton } from 'antd';
import Slider from "react-slick";
import { ReactNode } from 'react'

export default function ProductPageSkeleton() {

    const similarProdSkeletons:ReactNode[] = [];
    for (let i = 0; i <3; i++) similarProdSkeletons.push(<ProductCardSkeleton key={i}/>)

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
        <div className="w-full flex justify-between relative">
            <div className="w-full lg:max-w-[600px] xl:max-w-[740px]">
                <Skeleton.Input active block={true} size='small'/>
                <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                <div className="w-full">
                        <div className="w-full lg:max-w-[450px] relative grid grid-cols-1">
                            <Skeleton.Input active block={true} size='small' style={{marginBottom: '20px'}}/>
                            <Skeleton.Image active style={{height: '300px', width: '100%'}}/>
                        </div>
                        <hr className="mt-[30px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                        <div> 
                            <Skeleton.Input active block={true} size='small' style={{marginBottom: '20px'}}/>
                            <Slider {...settings}>
                                {similarProdSkeletons}
                            </Slider>
                        </div>
                        <hr className="mt-[30px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                        <Skeleton.Input block={true} active size='default' style={{marginBottom: '24px'}}/>
                        <Skeleton.Input block={true} active size='small'/>
                        <hr className="mt-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                </div>
            </div>
            <div className='hidden lg:block'>
                <Skeleton.Node children={false} active style={{width: '400px', height: '240px', borderRadius: '12px'}}/>
            </div>
        </div>
  )
}
