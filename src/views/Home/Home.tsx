import { CategoryType } from "@src/@types/types";
import CategoriesTab from "@src/components/CategoriesTab/CategoriesTab";
import useGetCategories from "@src/hooks/useGetCategories";
import FeaturedTab from "./FeaturedTab/FeaturedTab";
import HomeSlider from "./HomeSlider/HomeSlider";

export default function Home() {

  const {categories} = useGetCategories();
  const featuredTabs = categories.map((cat:CategoryType, index:number)=> {
    // if (index < 2) {
      return <FeaturedTab key={cat.id} categoryName={cat.name}/>
    // } else return null;
  })

    return (
      <div className="custom-container pt-[30px] pb-[60px] min-h-[700px]">
        <div className="flex">
          <CategoriesTab/>
          <HomeSlider/>
        </div>
        <div className="grid grid-cols-1 gap-[60px] mt-10">
          {featuredTabs}
        </div>
      </div>
  );
}
