import { ProfileMenuEnum } from '@src/@types/types';

import { Skeleton } from 'antd';
import { ReactNode, useEffect } from 'react'
import { FormattedMessage } from 'react-intl';
import OrderCard from './OrderCard/OrderCard';
import { useOrderHistoryProvider } from '@src/providers/OrderHistoryProvider/useOrderHistoryProvider';


export default function PurchaseHistory() {
    const historySkeletons:ReactNode[] = [];
    const {orders, ordersLoading, getOrders} = useOrderHistoryProvider();
    for (let i = 0; i < 4; i++) historySkeletons.push(<Skeleton.Node key={i} active children={false} style={{width: '100%', height: '96px', borderRadius: '12px'}}/>)

    useEffect(()=> {
      getOrders()
    }, [])

    return (
      <div>
          <h2 className="mb-[30px] firago-semibold text-lg leading-[22px] text-black-main dark:text-dark-black-main hidden lg:block"><FormattedMessage id={ProfileMenuEnum.ON_PURCHASE_HISTORY}/></h2>
          {ordersLoading && <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>{historySkeletons}</div>}
          {(!ordersLoading && orders.length === 0) && <div><p className='firago-medium text-black-08 dark:text-dark-black-8 text-sm leading-[17px]'><FormattedMessage id='purchase.history.empty'/></p></div>}
          {(!ordersLoading && orders.length > 0) && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                  {orders?.map((order) => <OrderCard key={order.id} order={order}/>
              )}
              </div>
          )}
      </div>
    )
}
