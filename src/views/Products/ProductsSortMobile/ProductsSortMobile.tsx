import { FormattedMessage } from 'react-intl'
import { SortEnum } from '@src/@types/types';
import { useState } from 'react';
import filterIcon from '@src/assets/icons/light/filter.png'
import filterIconDark from '@src/assets/icons/dark/filter.png'
import FilterProductsMobile from '@src/features/FilterProducts/FilterProductsMobile';
import SortProducts from '@src/features/SortProducts/SortProducts';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';

interface ProductsSortMobileProps {
    sortOrder: SortEnum;
    setSortOrder: React.Dispatch<React.SetStateAction<SortEnum>>;
    totalProducts: number;
}

export default function ProductsSortMobile({sortOrder, setSortOrder, totalProducts}: ProductsSortMobileProps) {
    const [filterModal, setFilterModal] = useState<boolean>(false);
    const {lightMode} = useThemeProvider();

    const showFilterModal = () => {
        setFilterModal(true);
    };

    const handleFilterCancel = () => {
        setFilterModal(false);
    };

    return (
        <div className='w-full lg:hidden mt-4'>
            <hr className="border border-solid border-border-white dark:border-border-dark-white mb-4"/>
            <div className='flex items-center justify-between'>
                <div className='w-full h-10 mr-8'>
                    <SortProducts setSortOrder={setSortOrder} sortOrder={sortOrder}/>
                </div>
            {/* add mobile filter button below*/}
                <div className='w-full'>
                    <button className='w-full h-10 border-none px-5 rounded-[30px] cursor-pointer shadow-md bg-light-theme-secondary-bg dark:bg-dark-theme-secondary-bg transition-colors duration-300 ease-in-out' onClick={showFilterModal}>
                        <div className='flex justify-start items-center'>
                            <img alt='filter icon' src={lightMode ? filterIcon : filterIconDark} className='w-5 mr-[10px]'/>
                            <p className='firago-medium text-xs leading-[14px] text-black-main dark:text-dark-black-main'><FormattedMessage id='filter'/></p>
                        </div>
                    </button>
                    <FilterProductsMobile isModalOpen={filterModal} handleCancel={handleFilterCancel} setSortOrder={setSortOrder} totalProducts={totalProducts}/>
                </div>
            </div>
    </div>
    )
}
