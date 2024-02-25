import { useGetBoughtProducts } from '@src/hooks/useGetBoughtProducts'
import React from 'react'
import { FormattedMessage } from 'react-intl';

export default function PurchaseHistory() {

    const {boughtProducts, boughtProductsLoading} = useGetBoughtProducts();

    const modifyDate = (created_at: string) => {
        const createdDate:Date = new Date(created_at);
        const formattedDate = createdDate.toISOString().split('T')[0]; // Extracting date part
        const formattedTime = createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formatting time

        return `${formattedDate} ${formattedTime}`;
    }

  return (
    <div>
        {boughtProductsLoading && <div>Loading...</div>}
        {(!boughtProductsLoading && boughtProducts.length === 0) && <div><FormattedMessage id='purchase.history.empty'/></div>}
        {(!boughtProductsLoading && boughtProducts.length > 0) && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {boughtProducts?.map((boughtProduct) => {
                return <div key={boughtProduct.id} className='w-full bg-white-400 p-4 rounded-xl flex justify-between'>
                    <div className='min-w-[140px]'> 
                        <h3 className='mb-4 firago-medium text-black-08 text-base leading-[19xp]'><FormattedMessage id='price'/>: <span className='firago-bold text-black'> {boughtProduct.totalPrice} ₾</span></h3>
                        <h3 className='firago-medium text-black-08 text-base leading-[19xp]'><FormattedMessage id='amount'/>:  <span className='firago-bold text-black'> {boughtProduct.totalItems}</span></h3>
                    </div>
                    <div className=''>
                        <h3 className='firago-medium text-black-08 text-base leading-[19xp]'><FormattedMessage id='date'/>: <span className='firago-bold text-black'> {modifyDate(boughtProduct.created_at)}</span></h3>
                    </div>
                </div>
            })}
            </div>
        )}
    </div>
  )
}
