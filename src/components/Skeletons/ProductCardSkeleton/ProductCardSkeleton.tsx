import { Skeleton } from 'antd'

export default function ProductCardSkeleton() {
  return (
    <div className='col-span-1 w-36 md:w-[165px] h-[300px] flex flex-col justify-between relative mx-auto'>
        <Skeleton.Image active style={{height: '165px', width: '100%'}}/>
        <Skeleton.Input active size="default" block={true} style={{height: '50px'}}/> 
        <Skeleton.Button block={true} active size="large" style={{maxHeight: '40px'}}/> 
    </div>
  )
}
