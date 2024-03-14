import { Skeleton} from "antd"
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

export default function HomePageSkeleton() {
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
