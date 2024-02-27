import LanguageSelector from "./LanguageSelector/LanguageSelector";
import FooterColumns from "./FooterColumns/FooterColumns";

export default function Footer() {
  return (
    <div className="w-full bg-white-400 dark:bg-dark-white-400">
        <FooterColumns/>
        <hr className="border border-solid border-border-white dark:border-border-dark-white"/>
        <div className="custom-container py-[10px]">
            <LanguageSelector/>
        </div>
    </div>
  )
}
