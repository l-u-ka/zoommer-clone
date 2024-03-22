import { BoughtProduct } from '@src/@types/types'
import { useRemoveOrder } from '@src/hooks/useRemoveOrder';
import { modifyDate } from '@src/utils/exportFunctions';
import { FormattedMessage } from 'react-intl'
import removeOrderIcon from '@src/assets/icons/light/close.png'
import removeOrderIconDark from '@src/assets/icons/dark/close.png'
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import LoadingSpinner from '@src/components/LoadingSpinner/LoadingSpinner';

export default function OrderCard({order}: {order: BoughtProduct}) {
    const {isRemoveLoading, removeOrder} = useRemoveOrder();
    const {lightMode} = useThemeProvider();

    function handleRemoveOrder(orderId: string) {
        removeOrder(orderId)
    }

  return (
    <div className='w-full bg-white-400 dark:bg-dark-white-400 transition-colors duration-300 ease-in-out p-4 rounded-xl flex justify-between'>
        <div className='min-w-[140px]'> 
            <h3 className='mb-4 firago-medium text-black-08 dark:text-dark-black-8 text-base leading-[19xp]'><FormattedMessage id='price'/>: <span className='firago-bold text-black-main dark:text-dark-black-main'> {order.totalPrice} ₾</span></h3>
            <h3 className='firago-medium text-black-08 dark:text-dark-black-8 text-base leading-[19xp]'><FormattedMessage id='amount'/>:  <span className='firago-bold text-black-main dark:text-dark-black-main'> {order.totalItems}</span></h3>
        </div>
        <div className='flex flex-col align-middle justify-between'>
            <h3 className='firago-medium text-black-08 dark:text-dark-black-8 text-base leading-[19xp]'><FormattedMessage id='date'/>: <span className='firago-bold text-black-main dark:text-dark-black-main'> {modifyDate(order.created_at)}</span></h3>
            <div className='self-end'>
                {!isRemoveLoading ? <img onClick={()=> handleRemoveOrder(order.id)} src={lightMode ? removeOrderIcon : removeOrderIconDark} alt='remove order icon' className='cursor-pointer w-3'/>
                    : <div className='relative left-[24px]'><LoadingSpinner custom={true} fullscreen={false} size={16}/></div>
                }
            </div>
        </div>
    </div>
  )
}
