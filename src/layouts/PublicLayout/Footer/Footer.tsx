import LanguageSelector from "./LanguageSelector/LanguageSelector";
import FooterColumns from "./FooterColumns/FooterColumns";

export default function Footer() {
  return (
    <div className="w-full bg-gray-primary dark:bg-[rgb(15,15,15)]">
        <FooterColumns/>
        <hr className="border border-solid border-white"/>
        <div className="custom-container py-[10px]">
            <LanguageSelector/>
        </div>
    </div>
  )
}
