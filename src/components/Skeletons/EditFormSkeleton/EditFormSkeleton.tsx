import { Skeleton } from "antd";

export default function EditFormSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6">
            <Skeleton.Input active block size="large" style={{height:'50px'}}/>
            <Skeleton.Input active block size="large" style={{height:'50px'}}/>
            <Skeleton.Input active block size="large" style={{height:'50px'}}/>
            <Skeleton.Input active block size="large" style={{height:'50px'}}/>
            <Skeleton.Button active block size="large" style={{height:'50px'}}/>
        </div>
    )
}
