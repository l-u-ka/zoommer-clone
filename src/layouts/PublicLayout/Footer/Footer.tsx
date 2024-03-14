import LanguageSelector from "./LanguageSelector/LanguageSelector";
import FooterColumns from "./FooterColumns/FooterColumns";

export default function Footer() {
  return (
    <div className="w-full bg-white-400 dark:bg-dark-white-400 transition-colors duration-300 ease-in-out relative bottom-0 left-0">
        <FooterColumns/>
        <hr className="border border-solid border-light-theme-bg dark:border-dark-theme-bg transition-all duration-300 ease-in-out"/>
        <div className="custom-container py-[10px] pb-20 lg:pb-[10px]">
            <LanguageSelector/>
        </div>
    </div>
  )
}
