import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider"
import {ConfigProvider, Skeleton} from "antd";
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { useAutoAnimate } from '@formkit/auto-animate/react'
;import { useMediaQuery } from "react-responsive";
import { ProfileMenuEnum } from "@src/@types/types";
import profileIcon from '@src/assets/icons/light/profile-icon.png'
import profileIconDark from '@src/assets/icons/dark/profile-icon.png'
import EditProfile from "./EditProfile/EditProfile";
import ProfilePageMobile from "./ProfilePageMobile";
import Wishlist from "./Wishlist/Wishlist";
import ProfilePageMenu from "./ProfilePageMenu/ProfilePageMenu"
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";

export default function ProfilePage() {
    const {userData} = useAuthProvider();    
    const [selected, setSelected] = useState<ProfileMenuEnum>((localStorage.getItem('selected') as ProfileMenuEnum) || ProfileMenuEnum.ON_EDITING);
    const {lightMode} = useThemeProvider();
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);
    const [parent] = useAutoAnimate({duration: 300, easing: 'ease-in-out'})
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const customTheme = {
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
        if(selected === ProfileMenuEnum.ON_MENU && isDesktop) {
                setSelected(ProfileMenuEnum.ON_EDITING)
                localStorage.setItem('selected', ProfileMenuEnum.ON_EDITING)
            }
      }, [isDesktop, selected])  // if user changes to dekstop, automatically set select on editing form
    

    return (
        <ConfigProvider theme={customTheme}>
            <div className="custom-container pt-[30px] pb-[60px]">
                {isDesktop ? (  // desktop profile page meu and content
                <div className="">
                    <div className="flex items-center">
                        <img src={lightMode ? profileIcon : profileIconDark} alt="profile icon" className="w-6 mr-3"/>
                        {!(updateLoading) ? <h1 className="text-2xl firago-bold leading-[29px] text-black-main dark:text-dark-black-main"> <FormattedMessage id="hello"/>, {userData?.first_name}</h1> 
                            : <Skeleton.Input size="default" block={true} active style={{width: '30%'}}/>
                        }
                    </div>
                    <hr className="mt-[20px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                    <div className="flex" >
                        {/* profile select menu */}
                        <ProfilePageMenu selected={selected} setSelected={setSelected}/>
                        <hr className="mr-[100px] border border-solid border-border-white dark:border-border-dark-white"/>
                        {/* profile page content */}
                        <div className="w-full" ref={parent}>
                            {(selected === ProfileMenuEnum.ON_EDITING) && <EditProfile updateLoading={updateLoading} setUpdateLoading={setUpdateLoading}/>}
                            {(selected === ProfileMenuEnum.ON_WISHLIST) && <Wishlist/>}
                            {(selected === ProfileMenuEnum.ON_PURCHASE_HISTORY) && <PurchaseHistory/>}
                        </div>
                    </div>
                </div>)
                : <ProfilePageMobile selected={selected} setSelected={setSelected} updateLoading={updateLoading} setUpdateLoading={setUpdateLoading}/>}
            </div>
        </ConfigProvider>
    )
}