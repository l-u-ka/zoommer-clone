import { FormattedMessage } from 'react-intl';
import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';

interface FullPriceCardProps {
    fullPrice: number;
    onClick: ()=> void;
    loading?: boolean;
    buttonText: string;
}

export default function FullPriceCard({fullPrice, onClick, loading, buttonText}: FullPriceCardProps) {

    return (
        <div className=''>
            <div className=' bg-white-400 dark:bg-dark-white-400 transition-colors duration-300 ease-in-out sticky top-0 shadow-lg py-5 rounded-xl mb-[30px]'>
                <div className='flex justify-between mx-4 mb-5'>
                    <h3 className='firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main opacity-60'><FormattedMessage id='price'/></h3>
                    <h3 className='firago-semibold text-base leading-[19px] text-black-main dark:text-dark-black-main'>{fullPrice} ₾</h3>
                </div>
                <div className='flex justify-between mx-4'>
                    <h3 className='firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main opacity-60'><FormattedMessage id='delivery.price'/></h3>
                    <h3 className='firago-semibold text-base leading-[19px] text-black-main dark:text-dark-black-main'>{0}₾</h3>
                </div>
                <hr className="mt-[24px] mb-[30px] border border-solid border-light-theme-bg dark:border-dark-theme-bg"/>
                <div className='flex justify-between mx-4'>
                    <h3 className='firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main opacity-60'><FormattedMessage id='total.amount.pay'/> </h3>
                    <h3 className='firago-semibold text-base leading-[19px] text-orange-main dark:text-dark-orange-main'>{fullPrice} ₾</h3>
                </div>
            </div>
            <PrimaryButton onClick={onClick} height={50} width="100%" loading={loading}><p className="firago-bold text-sm leading-[17px] text-white dark:black-main"><FormattedMessage id={buttonText}/></p></PrimaryButton>
        </div>
    )
}
