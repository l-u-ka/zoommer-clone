import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";
import { FormattedMessage } from "react-intl";

export default function FullPriceCardMobile({fullPrice, onClick}: {fullPrice: number, onClick: ()=> void}) {

  return (
    <div className='fixed left-0 bottom-[70px] w-full bg-white-400 dark:bg-dark-white-400 lg:hidden p-5 shadow-xl flex justify-between shadow-top'>
        <div className="flex flex-col justify-between">
            <h3 className="firago-medium text-sm leading-[17px] text-black-main dark:text-white-400"><FormattedMessage id="full.price"/></h3>
            <h3 className="firago-bold text-xl leading-[24px] text-black-main dark:text-white-400">{fullPrice} ₾</h3>
        </div>
        <div className="w-[180px]">
            <PrimaryButton onClick={onClick} height={50} width="100%"><p className="firago-bold text-base leading-[19px]"><FormattedMessage id="pay"/></p></PrimaryButton>
        </div>
    </div>
  )
}
