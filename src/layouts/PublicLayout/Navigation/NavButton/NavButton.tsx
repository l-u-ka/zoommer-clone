import { FormattedMessage } from "react-intl";
import { BUTTON_TYPE_ENUM } from "@src/@types/types";

interface NavItemProps {
    // color: string;
    // textColor: string;
    type: BUTTON_TYPE_ENUM;
    text: string;
    icon: string;
    onClick?: () => void;
    onMouseEnter?: ()=>void;
    onMouseLeave?: ()=>void;
}

export default function NavButton({type, text, icon, onClick, onMouseEnter} : NavItemProps) {
  return (
      // <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{backgroundColor: color}} className="inline-flex h-full items-center justify-between py-[10px] px-[15px] rounded-xl w-[130px] cursor-pointer">
      <div onClick={onClick} onMouseEnter={onMouseEnter} className={`${type===BUTTON_TYPE_ENUM.DEFAULT ? "bg-white" : "bg-orange-primary"} inline-flex h-full items-center justify-between py-[10px] px-[15px] rounded-xl w-[130px] cursor-pointer ${type===BUTTON_TYPE_ENUM.DEFAULT && "dark:bg-gray-primary"}`}>
        <img src={icon} alt="nav button icon" className="w-auto"/>
        <p className={`${type===BUTTON_TYPE_ENUM.DEFAULT ? " text-black" : "text-white"} firago-normal text-sm leading-[17px]`}><FormattedMessage id={text}/></p>
      </div>
  )
}
