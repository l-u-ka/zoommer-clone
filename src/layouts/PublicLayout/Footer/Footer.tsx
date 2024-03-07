import LanguageSelector from "./LanguageSelector/LanguageSelector";
import FooterColumns from "./FooterColumns/FooterColumns";

export default function Footer() {
  return (
    <div className="w-full bg-white-400 dark:bg-dark-white-400 transition-colors duration-300 ease-in-out">
        <FooterColumns/>
        <hr className="border border-solid border-light-theme-bg dark:border-dark-theme-bg transition-all duration-300 ease-in-out"/>
        <div className="custom-container py-[10px]">
            <LanguageSelector/>
        </div>
    </div>
  )
}
