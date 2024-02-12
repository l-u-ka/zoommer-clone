import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';
import { useCartProvider } from '@src/providers/CartProvider/useCartProvider'
import { getFullPrice } from '@src/utils/exportFunctions';
import React from 'react'
import { FormattedMessage } from 'react-intl';

export default function CartFullPrice({fullPrice}: {fullPrice: number}) {

    // const {cartItems} = useCartProvider();

    return (
        <div className=''>
            <div className='bg-[#f2f2f2] sticky top-0 shadow-lg py-5 rounded-xl mb-[30px]'>
                <div className='flex justify-between mx-4 mb-5'>
                    <h3 className='firago-medium text-base leading-[19px] text-black opacity-60'>ღირებულება</h3>
                    <h3 className='firago-semibold text-base leading-[19px] text-black'>{fullPrice} ₾</h3>
                </div>
                <div className='flex justify-between mx-4'>
                    <h3 className='firago-medium text-base leading-[19px] text-black opacity-60'>მიწოდების ღირებულება</h3>
                    <h3 className='firago-semibold text-base leading-[19px] text-black'>{0}₾</h3>
                </div>
                <hr className="mt-[24px] mb-[30px] border border-solid border-white"/>
                <div className='flex justify-between mx-4'>
                    <h3 className='firago-medium text-base leading-[19px] text-black opacity-60'>სულ გადასახდელი: </h3>
                    <h3 className='firago-semibold text-base leading-[19px] text-orange-primary'>{fullPrice} ₾</h3>
                </div>
            </div>
            <PrimaryButton height={50} width="100%"><p className="firago-bold text-sm leading-[17px] text-white"><FormattedMessage id="next"/></p></PrimaryButton>
        </div>
    )
}
