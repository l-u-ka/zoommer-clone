import { useState } from "react"
import { Modal, ConfigProvider, theme } from "antd"
import closeIcon from '@src/assets/icons/mobile-modal-close.png'
import RegistrationForm from "./RegistrationForm/RegistrationForm"
import AuthorizationForm from "./AuthorizationForm/AuthorizationForm"
import { FormattedMessage } from "react-intl"
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider"

interface ModalProps {
    modalOpen: boolean;
    closeModal: () => void;
}


export default function LogInModal({modalOpen, closeModal} : ModalProps) {
    const [onAuthorization, setOnAuthorization] = useState<boolean>(true);
    const {lightMode} = useThemeProvider();

    const customTheme = {
      "components": {
        "Form": {
          "colorError": lightMode ? "rgba(255,0,0,.8)" : "rgba(255, 26, 26, 0.8)",
        },
        "Input": {
          "activeBorderColor": "rgb(236, 94, 42)",
          "hoverBorderColor": "rgb(236, 94, 42)",
          "paddingInline": 14,
          "paddingBlock": 16,
          "borderRadius": 12,
          "colorBorder": lightMode ? "rgb(242, 242, 242)" : "#34383a",
          "colorBgContainer": lightMode ? "rgb(242, 242, 242)" :  "rgb(33,36,38)",
          "activeBg": lightMode ? "rgb(255, 255, 255)" : "rgb(24, 26, 27)",
          "lineHeight": 1.0625,
          "colorTextPlaceholder": lightMode ? "rgba(0, 0, 0, 0.6)" : "rgba(232, 230, 227, 0.6)",
          "activeShadow": "0",
          "colorText": lightMode ? "#000" : "#e8e6e3",
          "colorError": lightMode ? "rgba(255,0,0,.8)" : "rgba(255, 26, 26, 0.8)",
        },
        "Select": {
          "colorBgElevated": lightMode ? "rgb(242, 242, 242)" : "rgb(33,36,38)",
          "optionActiveBg": lightMode ? "rgb(255, 255, 255)" : "rgb(24, 26, 27)",
          "optionSelectedBg": "rgba(236, 94, 42, 0.8)",
          "colorPrimary": "#000",
          "colorPrimaryHover": "rgb(236, 94, 42)",
          "colorBorder": lightMode ? "rgb(242, 242, 242)" : "#34383a",
          "boxShadowSecondary": "",
          "controlOutline": "rgba(255, 255, 255, 0)",
          "colorTextPlaceholder": "rgba(0, 0, 0, 0.6)",
          "colorError": lightMode ? "rgba(255,0,0,.8)" : "rgba(255, 26, 26, 0.8)",
        },
        "Modal": {
          "borderRadiusLG": 20,
          "borderRadiusSM": 10,
          "contentBg": lightMode ? "#FFFFFF" : "rgb(24, 26, 27)"
        },
      }
    }

  return (
    <ConfigProvider theme={customTheme} >
        <Modal open={modalOpen} footer={false} onCancel={closeModal} className=" !w-[400px] md:!w-[440px] top-[80px]" maskClosable={false} style={{}} closeIcon={<img className="relative top-[-8px]" src={closeIcon} alt="modal close icon"/>}>
            <div className="flex">
                <div className="w-1/2 cursor-pointer" onClick={()=>setOnAuthorization(true)}>
                    <p className={`${onAuthorization ? 'firago-bold text-orange-main dark:text-text-dark-orange-main' : 'firago-medium'} text-center text-black-main dark:text-dark-black-main text-base leading-[19px] mt-2 mb-[14px]`}><FormattedMessage id="authorization"/></p>
                    <hr className={`border border-solid ${onAuthorization ? ' border-orange-main dark:border-dark-orange-main' : 'border-border-white dark:border-border-dark-white'}`}/>
                </div>
                <div className="w-1/2 cursor-pointer" onClick={()=>setOnAuthorization(false)}>
                    <p className={`${!onAuthorization ? 'firago-bold text-orange-main dark:text-text-dark-orange-main' : 'firago-medium'} text-center text-black-main dark:text-dark-black-main text-base leading-[19px] mt-2 mb-[14px]`}><FormattedMessage id="registration"/></p>
                    <hr className={`border border-solid ${!onAuthorization ? ' border-orange-main' : 'border-border-white dark:border-border-dark-white'}`}/>
                </div>
            </div>
            <div className="pt-5">
                {onAuthorization ? <AuthorizationForm closeModal={closeModal}/> : <RegistrationForm closeModal={closeModal}/>}
            </div>
        </Modal>
    </ConfigProvider>
  )
}
