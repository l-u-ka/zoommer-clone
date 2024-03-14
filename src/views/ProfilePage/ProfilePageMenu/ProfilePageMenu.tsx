import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import LogoutModal from "@src/components/LogoutModal/LogoutModal";
import { ProfileMenuEnum } from '@src/@types/types';

interface ProfilePageMenuProps {
    selected: ProfileMenuEnum;
    setSelected: React.Dispatch<React.SetStateAction<ProfileMenuEnum>>;
}

export default function ProfilePageMenu({selected, setSelected}: ProfilePageMenuProps) {

    function handleMenuSelect(selectOption: ProfileMenuEnum) {
        setSelected(selectOption)
        localStorage.setItem('selected', selectOption)
    }

    const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);

    function showLogoutModal() {
        setIsLogoutModal(true);
    }
    function closeLogoutModal() {
        setIsLogoutModal(false);
    }

    return (
        <div className="flex flex-col min-w-[220px]">
            <h4 onClick={() => handleMenuSelect(ProfileMenuEnum.ON_EDITING)} className={`cursor-pointer ${selected === ProfileMenuEnum.ON_EDITING ? "firago-bold" : "firago-normal opacity-80"} text-black-main dark:text-dark-black-main text-sm leading-[17px] mb-7`}><FormattedMessage id={ProfileMenuEnum.ON_EDITING}/></h4>
            <h4 onClick={() => handleMenuSelect(ProfileMenuEnum.ON_WISHLIST)} className={`cursor-pointer ${selected === ProfileMenuEnum.ON_WISHLIST ? "firago-bold" : "firago-normal opacity-80"} text-black-main dark:text-dark-black-main text-sm leading-[17px] mb-7`}><FormattedMessage id={ProfileMenuEnum.ON_WISHLIST}/></h4>
            <h4 onClick={() => handleMenuSelect(ProfileMenuEnum.ON_PURCHASE_HISTORY)} className={`cursor-pointer ${selected === ProfileMenuEnum.ON_PURCHASE_HISTORY ? "firago-bold" : "firago-normal opacity-80"} text-black-main dark:text-dark-black-main text-sm leading-[17px]`}><FormattedMessage id={ProfileMenuEnum.ON_PURCHASE_HISTORY}/></h4>
            <h4 className="text-orange-main cursor-pointer firago-normal leading-[17px] text-sm opacity-80 block mt-60" 
             onClick={showLogoutModal}><FormattedMessage id="logout"/></h4>
            {isLogoutModal && <LogoutModal modalOpen={isLogoutModal} closeModal={closeLogoutModal}/>}
        </div>
    )
}
