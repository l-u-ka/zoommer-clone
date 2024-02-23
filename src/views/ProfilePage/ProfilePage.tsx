import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider"
import {ConfigProvider} from "antd";
import profileIcon from '@src/assets/icons/profile-icon.png'
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import LogoutModal from "@src/components/LogoutModal/LogoutModal";
import EditProfile from "./EditProfile/EditProfile";
import ProfilePageMobile from "./ProfilePageMobile";
import Wishlist from "./Wishlist/Wishlist";
import { useMediaQuery } from "react-responsive";


export enum PROFILE_MENU_ENUM {
    ON_EDITING = "edit.profile",
    ON_WISHLIST = "wishlist",
    ON_MENU = "hello",
    ON_PURCHASE_HISTORY= "purchase.history"
}


export default function ProfilePage() {
    const {userData} = useAuthProvider();
    const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<PROFILE_MENU_ENUM>(PROFILE_MENU_ENUM.ON_EDITING);
    const isDesktop = useMediaQuery({ minWidth: 1024 });

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
            "activeBorderColor": "rgb(236, 94, 42)",
            "hoverBorderColor": "rgb(236, 94, 42)",
            "paddingInline": 14,
            "paddingBlock": 16,
            "borderRadius": 12,
            "colorBorder": "rgb(242, 242, 242)",
            "colorBgContainer": "rgb(242, 242, 242) !important",
            "lineHeight": 1.0625,
            "colorTextPlaceholder": "rgba(0, 0, 0, 0.6)",
            "activeShadow": "0",
          },
          "Button": {
            "colorPrimary": "rgb(236, 94, 42)",
            "colorPrimaryHover": "rgb(236, 94, 42)",
            "colorPrimaryActive": "rgb(236, 94, 42)",
            "borderRadius": 12,
            "controlHeight": 50,
            "controlHeightLG": 50,
            "controlHeightSM": 30,
            "lineHeight": 1.75,
            "defaultBorderColor": "rgb(250, 84, 28)",
          },
          "Modal": {
            "borderRadiusLG": 20,
            "borderRadiusSM": 10
          },
        }
      }

      useEffect(()=> {
        if(selected === PROFILE_MENU_ENUM.ON_MENU && isDesktop) setSelected(PROFILE_MENU_ENUM.ON_EDITING)
      }, [isDesktop, selected])
    

    return (
        <ConfigProvider theme={customTheme}>
            <div className="custom-container pt-[30px] pb-[60px] min-h-screen">
                <div className="hidden lg:block">
                    <div className="flex items-center">
                        <img src={profileIcon} alt="profile icon" className="w-6 mr-3"/>
                        <h1 className="text-2xl firago-bold leading-[29px] text-black-main dark:text-white-400"> <FormattedMessage id="hello"/>, {userData?.first_name}</h1>
                    </div>
                    <hr className="mt-[20px] mb-[30px] border border-solid border-white-400"/>
                    <div className="flex">
                        <div className="flex flex-col min-w-[220px]">
                            <h4 onClick={() => setSelected(PROFILE_MENU_ENUM.ON_EDITING)} className={`cursor-pointer ${selected === PROFILE_MENU_ENUM.ON_EDITING ? "firago-bold" : "firago-normal opacity-80"} text-black dark:text-white-400 text-sm leading-[17px] mb-7`}><FormattedMessage id={PROFILE_MENU_ENUM.ON_EDITING}/></h4>
                            <h4 onClick={() => setSelected(PROFILE_MENU_ENUM.ON_WISHLIST)} className={`cursor-pointer ${selected === PROFILE_MENU_ENUM.ON_WISHLIST ? "firago-bold" : "firago-normal opacity-80"} text-black dark:text-white-400 text-sm leading-[17px]`}><FormattedMessage id={PROFILE_MENU_ENUM.ON_WISHLIST}/></h4>
                            <h4 className="text-orange-primary cursor-pointer firago-normal leading-[17px] text-sm opacity-80 block mt-60" 
                                onClick={showLogoutModal}><FormattedMessage id="logout"/></h4>
                                {isLogoutModal && <LogoutModal modalOpen={isLogoutModal} closeModal={closeLogoutModal}/>}
                            </div>
                            <hr className="mr-[100px] border border-solid border-white-400"/>
                            <div className="w-full">
                                <h2 className="mb-[30px] firago-semibold text-lg leading-[22px] text-black-main dark:text-white-400"><FormattedMessage id={selected}/></h2>
                                {(selected === PROFILE_MENU_ENUM.ON_EDITING) && <EditProfile/>}
                                {(selected === PROFILE_MENU_ENUM.ON_WISHLIST) && <Wishlist/>}
                            </div>
                    </div>
                </div>
                <div className="block lg:hidden">
                    <ProfilePageMobile selected={selected} setSelected={setSelected}/>
                </div>
            </div>
        </ConfigProvider>
    )
}