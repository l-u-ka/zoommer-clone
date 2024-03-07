import { FormattedMessage } from "react-intl";
import { BUTTON_TYPE_ENUM } from "@src/@types/types";

interface NavItemProps {
    type: BUTTON_TYPE_ENUM;
    text: string;
    icon: string;
    onClick?: () => void;
    onMouseEnter?: ()=>void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    cartItems?: number;
}

export default function NavButton({type, text, icon, onClick, onMouseEnter, onMouseLeave, cartItems} : NavItemProps) {
  return (
      <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${type===BUTTON_TYPE_ENUM.DEFAULT ? "bg-light-theme-bg dark:bg-dark-theme-bg" : "bg-orange-main dark:bg-dark-orange-main"} inline-flex relative h-11 items-center justify-between px-[15px] rounded-xl w-[130px] cursor-pointer opacity-80 transition-all ease-in-out duration-300 hover:opacity-100`}>
        {(cartItems !== undefined && cartItems > 0) && <div className="absolute bg-orange-main w-5 h-5 rounded-[50%] top-[-8px] left-8 flex justify-center items-center"><p className="text-white firago-medium text-xs leading-[14px]">{cartItems}</p></div>}
        <img src={icon} alt="nav button icon" className="w-auto h-5"/>
        <p className={`${type===BUTTON_TYPE_ENUM.DEFAULT ? " text-black-main dark:text-dark-black-main" : "text-white"} firago-medium text-sm leading-[17px]`}><FormattedMessage id={text}/></p>
      </div>
  )
}
