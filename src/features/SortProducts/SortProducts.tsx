import { SortEnum } from "@src/@types/types";
import { Dropdown, MenuProps } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import dropdownArrow from '@src/assets/icons/light/arrow-up-black.png'
import dropDownArrowDark from '@src/assets/icons/dark/arrow-up-black.png'
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";

interface SortProductsProps {
  sortOrder: SortEnum;
  setSortOrder: (sortOrder: SortEnum)=>void
}

export default function SortProducts({sortOrder ,setSortOrder}: SortProductsProps) {

    const [isDropped, setIsDropped] = useState<boolean>(false);
    const {lightMode} = useThemeProvider();

    useEffect(()=> {
        setIsDropped(false)
    }, [sortOrder])

    const menuStyles:CSSProperties = {
        border: `1px solid ${lightMode ? '#ec5e2a' : '#c1471c'} `,
        width: '100%',
        backgroundColor: lightMode ? 'rgba(237, 235, 235)' : 'rgba(35, 38, 39)',
    };
    
    const menuItems:MenuProps['items'] = [
        { key: '1', 
          label: <p className=" firago-medium text-sm leading-[16px] text-black-08 dark:text-dark-black-8"><FormattedMessage id={SortEnum.PRICE_ASC}/></p>,
          onClick: () => {setSortOrder(SortEnum.PRICE_ASC)}
        },
        { key: '2', 
          label: <p className=" firago-medium text-sm leading-[16px] text-black-08 dark:text-dark-black-8"><FormattedMessage id={SortEnum.PRICE_DESC}/></p>, 
          onClick: () => {setSortOrder(SortEnum.PRICE_DESC)}
        },
        { key: '3', 
          label: <p className=" firago-medium text-sm leading-[16px] text-black-08 dark:text-dark-black-8"><FormattedMessage id={SortEnum.TITLE_ASC}/></p>, 
          onClick: () => {setSortOrder(SortEnum.TITLE_ASC)}
        },
        { key: '4', 
          label: <p className=" firago-medium text-sm leading-[16px] text-black-08 dark:text-dark-black-8"><FormattedMessage id={SortEnum.TITLE_DESC}/></p>, 
          onClick: () => {setSortOrder(SortEnum.TITLE_DESC)}
        },
      ];

    return (
        <Dropdown menu={{items: menuItems, style: menuStyles}} placement="bottom" trigger={['click']}>
            <button className="w-full h-full border-none rounded-[30px] cursor-pointer shadow-md px-4 bg-light-theme-secondary-bg dark:bg-dark-theme-secondary-bg transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-between" onClick={()=>setIsDropped(prev => !prev)}>
                    <p className="firago-medium text-black-main dark:text-dark-black-main text-xs leading-[14px] mr-2"><FormattedMessage id={sortOrder}/></p>
                    <img src={lightMode ? dropdownArrow : dropDownArrowDark} alt="dropdown arrow" className={`w-3 ${isDropped && 'rotate-180'}`} />
                </div>
            </button>
        </Dropdown>
    )
}
