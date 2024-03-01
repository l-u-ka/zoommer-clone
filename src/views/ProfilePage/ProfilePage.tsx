import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider"
import {ConfigProvider, Skeleton} from "antd";
import profileIcon from '@src/assets/icons/profile-icon.png'
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import LogoutModal from "@src/components/LogoutModal/LogoutModal";
import EditProfile from "./EditProfile/EditProfile";
import ProfilePageMobile from "./ProfilePageMobile";
import Wishlist from "./Wishlist/Wishlist";
import { useMediaQuery } from "react-responsive";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";


export enum PROFILE_MENU_ENUM {
    ON_EDITING = "edit.profile",
    ON_WISHLIST = "wishlist",
    ON_MENU = "hello",
    ON_PURCHASE_HISTORY= "purchase.history"
}


export default function ProfilePage() {
    const {userData} = useAuthProvider();
    const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<PROFILE_MENU_ENUM>((localStorage.getItem('selected') as PROFILE_MENU_ENUM) || PROFILE_MENU_ENUM.ON_EDITING);
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const {lightMode} = useThemeProvider();
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);

    function showLogoutModal() {
        setIsLogoutModal(true);
    }
    function closeLogoutModal() {
        setIsLogoutModal(false);
    }

    const customTheme = {
        // algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
        "components": {
          "Input": {
            "activeBorderColor": "rgb(236, 94, 42) !important",
            "hoverBorderColor": "rgb(236, 94, 42) !important",
            "paddingInline": 14,
            "paddingBlock": 16,
            "borderRadius": 12,
            "colorBorder": lightMode ? "rgb(242, 242, 242) !important" : "#34383a !important",
            "colorBgContainer": lightMode ? "rgb(242, 242, 242) !important" :  "rgb(33,36,38) !important",
            "activeBg": lightMode ? "rgb(255, 255, 255) !important" : "rgb(24, 26, 27) !important",
            "lineHeight": 1.0625,
            "colorTextPlaceholder": lightMode ? "rgba(0, 0, 0, 0.6) !important" : "rgba(232, 230, 227, 0.6) !important",
            "activeShadow": "0",
            "colorText": lightMode ? "#000 !important" : "#e8e6e3 !important",
            "colorError": lightMode ? "rgba(255,0,0,.8)" : "rgba(255, 26, 26, 0.8)",
            "colorBgContainerDisabled": lightMode ? "rgba(242, 242, 242, 0.4) !important" :  "rgba(33,36,38, 0.4) !important",
          },
          "Modal": {
            "borderRadiusLG": 20,
            "borderRadiusSM": 10,
            "contentBg": lightMode ? "#FFFFFF !important" : "rgb(24, 26, 27) !important"
          }
        }
      }

      useEffect(()=> {
        if(selected === PROFILE_MENU_ENUM.ON_MENU && isDesktop) {
                setSelected(PROFILE_MENU_ENUM.ON_EDITING)
                localStorage.setItem('selected', PROFILE_MENU_ENUM.ON_EDITING)
            }
      }, [isDesktop, selected])

      function handleMenuSelect(selectOption: PROFILE_MENU_ENUM) {
        setSelected(selectOption)
        localStorage.setItem('selected', selectOption)
      }
    

    return (
        <ConfigProvider theme={customTheme}>
            <div className="custom-container pt-[30px] pb-[60px]">
                <div className="hidden lg:block">
                    <div className="flex items-center">
                        <img src={profileIcon} alt="profile icon" className="w-6 mr-3"/>
                        {!(updateLoading) ? <h1 className="text-2xl firago-bold leading-[29px] text-black-main dark:text-dark-black-main"> <FormattedMessage id="hello"/>, {userData?.first_name}</h1> 
                            : <Skeleton.Input size="default" block={true} active style={{width: '30%'}}/>
                        }
                    </div>
                    <hr className="mt-[20px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                    <div className="flex">
                        <div className="flex flex-col min-w-[220px]">
                            <h4 onClick={() => handleMenuSelect(PROFILE_MENU_ENUM.ON_EDITING)} className={`cursor-pointer ${selected === PROFILE_MENU_ENUM.ON_EDITING ? "firago-bold" : "firago-normal opacity-80"} text-black-main dark:text-dark-black-main text-sm leading-[17px] mb-7`}><FormattedMessage id={PROFILE_MENU_ENUM.ON_EDITING}/></h4>
                            <h4 onClick={() => handleMenuSelect(PROFILE_MENU_ENUM.ON_WISHLIST)} className={`cursor-pointer ${selected === PROFILE_MENU_ENUM.ON_WISHLIST ? "firago-bold" : "firago-normal opacity-80"} text-black-main dark:text-dark-black-main text-sm leading-[17px] mb-7`}><FormattedMessage id={PROFILE_MENU_ENUM.ON_WISHLIST}/></h4>
                            <h4 onClick={() => handleMenuSelect(PROFILE_MENU_ENUM.ON_PURCHASE_HISTORY)} className={`cursor-pointer ${selected === PROFILE_MENU_ENUM.ON_PURCHASE_HISTORY ? "firago-bold" : "firago-normal opacity-80"} text-black-main dark:text-dark-black-main text-sm leading-[17px]`}><FormattedMessage id={PROFILE_MENU_ENUM.ON_PURCHASE_HISTORY}/></h4>
                            <h4 className="text-orange-main cursor-pointer firago-normal leading-[17px] text-sm opacity-80 block mt-60" 
                                onClick={showLogoutModal}><FormattedMessage id="logout"/></h4>
                                {isLogoutModal && <LogoutModal modalOpen={isLogoutModal} closeModal={closeLogoutModal}/>}
                            </div>
                            <hr className="mr-[100px] border border-solid border-border-white dark:border-border-dark-white"/>
                            <div className="w-full">
                                <h2 className="mb-[30px] firago-semibold text-lg leading-[22px] text-black-main dark:text-dark-black-main"><FormattedMessage id={selected}/></h2>
                                {(selected === PROFILE_MENU_ENUM.ON_EDITING) && <EditProfile updateLoading={updateLoading} setUpdateLoading={setUpdateLoading}/>}
                                {(selected === PROFILE_MENU_ENUM.ON_WISHLIST) && <Wishlist/>}
                                {(selected === PROFILE_MENU_ENUM.ON_PURCHASE_HISTORY) && <PurchaseHistory/>}
                            </div>
                    </div>
                </div>
                <div className="block lg:hidden">
                    <ProfilePageMobile selected={selected} setSelected={setSelected} updateLoading={updateLoading} setUpdateLoading={setUpdateLoading}/>
                </div>
            </div>
        </ConfigProvider>
    )
}