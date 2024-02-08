import { SORT_BY_ENUM } from "@src/@types/types";
import { Dropdown, MenuProps } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import dropdownArrow from '@src/assets/icons/arrow-up-black.png'

export default function SortProducts({sortOrder ,setSortOrder}: {sortOrder: SORT_BY_ENUM,setSortOrder: (sortOrder: SORT_BY_ENUM)=>void}) {

    const [isDropped, setIsDropped] = useState<boolean>(false);

    useEffect(()=> {
        setIsDropped(false)
    }, [sortOrder])

    const menuStyles:CSSProperties = {
        // border: '1px solid #ec5e2a',
        width: '100%'
    };
    
    const menuItems:MenuProps['items'] = [
        { key: '1', 
          label: <FormattedMessage id={SORT_BY_ENUM.PRICE_ASC}/>, 
          onClick: () => {setSortOrder(SORT_BY_ENUM.PRICE_ASC)}
        },
        { key: '2', 
          label: <FormattedMessage id={SORT_BY_ENUM.PRICE_DESC}/>, 
          onClick: () => {setSortOrder(SORT_BY_ENUM.PRICE_DESC)}
        },
        { key: '3', 
          label: <FormattedMessage id={SORT_BY_ENUM.TITLE_ASC}/>, 
          onClick: () => {setSortOrder(SORT_BY_ENUM.TITLE_ASC)}
        },
        { key: '4', 
          label: <FormattedMessage id={SORT_BY_ENUM.TITLE_DESC}/>, 
          onClick: () => {setSortOrder(SORT_BY_ENUM.TITLE_DESC)}
        },
      ];

    return (
        <Dropdown menu={{items: menuItems, style: menuStyles}} placement="bottom" trigger={['click']}>
            <button className="w-full h-full border-none rounded-[30px] cursor-pointer shadow-md px-4">
                <div className="flex items-center justify-between" onClick={()=>setIsDropped(prev => !prev)}>
                    <p className="firago-medium text-black text-xs leading-[14px] mr-2"><FormattedMessage id={sortOrder}/></p>
                    <img src={dropdownArrow} alt="dropdown arrow" className={`w-3 ${isDropped && 'rotate-180'}`} />
                </div>
            </button>
        </Dropdown>
    )
}
