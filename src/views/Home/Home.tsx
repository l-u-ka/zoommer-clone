import CategoriesTab from "@src/components/CategoriesTab/CategoriesTab";

export default function Home() {

  console.log("Render")

    return (
      <div className="custom-container pt-[30px] pb-[60px]">
        <CategoriesTab/>
      </div>
  );
}
