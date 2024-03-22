import CategoriesTab from "@src/components/CategoriesTab/CategoriesTab";
import HomeSlider from "./HomeSlider/HomeSlider";
import Featured from "./Featured/Featured";
import useGetCategories from "@src/hooks/useGetCategories";
import HomePageSkeleton from "@src/components/Skeletons/HomePageSkeleton/HomePageSkeleton";
import { Helmet } from "react-helmet-async";


export default function Home() {

  const {categoriesLoading} = useGetCategories();
  

    return (
      <>
        <Helmet>
          <title>Home</title>
          <meta name='home' content='Home page' />
        </Helmet>
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
      </>
  );
}
