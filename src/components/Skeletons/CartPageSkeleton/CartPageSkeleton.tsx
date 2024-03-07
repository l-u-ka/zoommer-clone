import { Skeleton } from "antd";

export default function CartPageSkeleton() {
  return (
    <div>
        <Skeleton.Input active size="default" block style={{width: '30%'}}/>
        <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
        <div className="flex">
            <div className="w-full mb-32 flex justify-between">
                <div className='w-full grid grid-cols-1 gap-[10px]'>
                    <Skeleton.Node children={false} active style={{width: '100%', height: '80px'}}/>
                    <Skeleton.Node children={false} active style={{width: '100%', height: '80px'}}/>
                    <Skeleton.Node children={false} active style={{width: '100%', height: '80px'}}/>
                </div>
                <div className='hidden lg:block ml-[50px]'>
                    <Skeleton.Node children={false} active style={{width: '400px', height: '240px', borderRadius: '12px'}}/>
                </div>
            </div>
        </div>
    </div>
  )
}
