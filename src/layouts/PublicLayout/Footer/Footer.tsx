import LanguageSelector from "./LanguageSelector/LanguageSelector";
import FooterColumns from "./FooterColumns/FooterColumns";

export default function Footer() {
  return (
    <div className="w-full bg-white-400 dark:bg-[#1f1f1f]">
        <FooterColumns/>
        <hr className="border border-solid border-white"/>
        <div className="custom-container py-[10px]">
            <LanguageSelector/>
        </div>
    </div>
  )
}
