import CategoriesTab from "@src/components/CategoriesTab/CategoriesTab";
import HomeSlider from "./HomeSlider/HomeSlider";
import Featured from "./Featured/Featured";
import useGetCategories from "@src/hooks/useGetCategories";
import HomePageSkeleton from "@src/components/Skeletons/HomePageSkeleton/HomePageSkeleton";

export default function Home() {

  const {categoriesLoading} = useGetCategories();
  

    return (
      <div className="custom-container pt-[30px] pb-[60px] min-h-[80vh]">
        {categoriesLoading ? <HomePageSkeleton/> : (
        <>
          <div className="flex">
            <CategoriesTab/>
            <HomeSlider/>
          </div>
          {!categoriesLoading && <Featured/>}
        </>)}
      </div>
  );
}
