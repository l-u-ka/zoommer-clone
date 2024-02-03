import { FormattedMessage } from "react-intl"
import cartButtonIcon from '@src/assets/icons/cart-button.png'

export default function AddCartButton({height} : {height: string}) {
  return (
    <button style={{height: height}} className="border-none bg-[#f28f6a] rounded cursor-pointer hover:scale-95 transition-all ease-in-out">
        <div className="inline-flex items-center mx-auto">
            <img src={cartButtonIcon} className="w-[14px] mr-[10px]"/>
            <p className="text-black firago-semibold text-xs leading-5 opacity-80"><FormattedMessage id="add"/></p>
        </div>
    </button>
  )
}
