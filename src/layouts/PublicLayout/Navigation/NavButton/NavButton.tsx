import { FormattedMessage } from "react-intl";

interface NavItemProps {
    color: string;
    text: string;
    textColor: string;
    icon: string;
}

export default function NavButton({color, text, textColor, icon} : NavItemProps) {
  console.log(color, icon)
  return (
    <div style={{backgroundColor: color}} className="inline-flex items-center justify-between py-[10px] px-[15px] rounded-xl w-[130px] cursor-pointer">
      <img src={icon} alt="nav button icon" className="w-auto"/>
      <p style={{color: textColor}} className="firago-normal text-sm leading-[17px]"><FormattedMessage id={text}/></p>
    </div>
  )
}
