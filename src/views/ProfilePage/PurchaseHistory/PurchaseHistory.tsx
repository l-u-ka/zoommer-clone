import { useGetBoughtProducts } from '@src/hooks/useGetBoughtProducts'
import { Skeleton } from 'antd';
import { ReactNode } from 'react'
import { FormattedMessage } from 'react-intl';

export default function PurchaseHistory() {

    const {boughtProducts, boughtProductsLoading} = useGetBoughtProducts();

    const modifyDate = (created_at: string) => {
        const createdDate:Date = new Date(created_at);
        const formattedDate = createdDate.toISOString().split('T')[0]; // Extracting date part
        const formattedTime = createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formatting time
        return `${formattedDate} ${formattedTime}`;
    }

    const historySkeletons:ReactNode[] = [];
    for (let i = 0; i < 4; i++) historySkeletons.push(<Skeleton.Node key={i} active children={false} style={{width: '100%', height: '96px', borderRadius: '12px'}}/>)

  return (
    <div>
        {boughtProductsLoading && <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>{historySkeletons}</div>}
        {(!boughtProductsLoading && boughtProducts.length === 0) && <div><FormattedMessage id='purchase.history.empty'/></div>}
        {(!boughtProductsLoading && boughtProducts.length > 0) && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {boughtProducts?.map((boughtProduct) => {
                return <div key={boughtProduct.id} className='w-full bg-white-400 dark:bg-dark-white-400 transition-colors duration-300 ease-in-out p-4 rounded-xl flex justify-between'>
                    <div className='min-w-[140px]'> 
                        <h3 className='mb-4 firago-medium text-black-08 dark:text-dark-black-8 text-base leading-[19xp]'><FormattedMessage id='price'/>: <span className='firago-bold text-black-main dark:text-dark-black-main'> {boughtProduct.totalPrice} ₾</span></h3>
                        <h3 className='firago-medium text-black-08 dark:text-dark-black-8 text-base leading-[19xp]'><FormattedMessage id='amount'/>:  <span className='firago-bold text-black-main dark:text-dark-black-main'> {boughtProduct.totalItems}</span></h3>
                    </div>
                    <div className=''>
                        <h3 className='firago-medium text-black-08 dark:text-dark-black-8 text-base leading-[19xp]'><FormattedMessage id='date'/>: <span className='firago-bold text-black-main dark:text-dark-black-main'> {modifyDate(boughtProduct.created_at)}</span></h3>
                    </div>
                </div>
            })}
            </div>
        )}
    </div>
  )
}
