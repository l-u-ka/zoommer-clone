import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";
import { FormattedMessage } from "react-intl";

interface FullPriceCardMobilePurchaseProps {
    fullPrice: number, 
    onClick?: ()=> void, 
    loading?: boolean
    buttonText: string,
}

export default function FullPriceCardMobilePurchase({fullPrice, onClick, loading, buttonText}: FullPriceCardMobilePurchaseProps) {

  return (
    <div className='w-full bg-white dark:bg-dark-theme-bg shadow-black shadow-2xl'>
        <div className="w-full p-5 bg-242-600 dark:bg-white-400">
            <div className="flex justify-between mb-5">
                <h3 className="firago-semibold text-base leading-[19px] text-black-06"><FormattedMessage id="price"/></h3>
                <h3 className="firago-semibold text-base leading-[19px] text-black">{fullPrice} ₾</h3>
            </div>
            <div className="flex justify-between">
                <h3 className="firago-semibold text-base leading-[19px] text-black-06"><FormattedMessage id="delivery.price"/></h3>
                <h3 className="firago-semibold text-base leading-[19px] text-black">0 ₾</h3>
            </div>
            <hr className="mt-5 mb-5 border border-solid border-white"/>
            <div className="flex justify-between">
                <h3 className="firago-semibold text-base leading-[19px] text-black-06"><FormattedMessage id="sum.price"/></h3>
                <h3 className="firago-semibold text-base leading-[19px] text-black">{fullPrice} ₾</h3>
            </div>
        </div>
        <div className="w-full px-5 pt-5 pb-24">
            <div className="w-full">
                <PrimaryButton loading={loading ? loading : undefined} onClick={onClick} height={50} width="100%"><p className="firago-bold text-base leading-[19px]"><FormattedMessage id={buttonText}/></p></PrimaryButton>
            </div>
        </div>
    </div>
  )
}