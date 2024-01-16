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
    const {defaultAlgorithm, darkAlgorithm} = theme;

    const customTheme = {
      algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
      "components": {
        "Input": {
          "activeBorderColor": "rgb(236, 94, 42)",
          "hoverBorderColor": "rgb(236, 94, 42)",
          "paddingInline": 14,
          "paddingBlock": 16,
          "borderRadius": 12,
          "colorBorder": "rgb(242, 242, 242)",
          "colorBgContainer": "rgb(242, 242, 242)",
          "lineHeight": 1.0625,
          "colorTextPlaceholder": "rgba(0, 0, 0, 0.6)"
        },
        "Button": {
          "colorPrimary": "rgb(236, 94, 42)",
          "colorPrimaryHover": "rgb(236, 94, 42)",
          "colorPrimaryActive": "rgb(236, 94, 42)",
          "borderRadius": 12,
          "controlHeight": 50,
          "controlHeightLG": 50,
          "controlHeightSM": 30,
          "lineHeight": 1.0625
        },
        "Modal": {
          "borderRadiusLG": 20,
          "borderRadiusSM": 10
        },
      }
    }

  return (
    <ConfigProvider theme={customTheme} >
        <Modal open={modalOpen} footer={false} onCancel={closeModal} maskClosable={false} className="custom-modal" closeIcon={<img className="relative top-[-8px]" src={closeIcon} alt="modal close icon"/>}>
            <div className="flex">
                <div className="w-1/2 cursor-pointer" onClick={()=>setOnAuthorization(true)}>
                    <p className={`${onAuthorization ? 'firago-bold' : 'firago-medium'} text-center text-base leading-[19px] mt-2 mb-[14px]`}><FormattedMessage id="authorization"/></p>
                    <hr className={`border border-solid ${onAuthorization ? ' border-orange-primary' : 'border-gray-primary'}`}/>
                </div>
                <div className="w-1/2 cursor-pointer" onClick={()=>setOnAuthorization(false)}>
                    <p className={`${!onAuthorization ? 'firago-bold' : 'firago-medium'} text-center text-base leading-[19px] mt-2 mb-[14px]`}><FormattedMessage id="registration"/></p>
                    <hr className={`border border-solid ${!onAuthorization ? ' border-orange-primary' : 'border-gray-primary'}`}/>
                </div>
            </div>
            <div className="pt-5">
                {onAuthorization ? <AuthorizationForm closeModal={closeModal}/> : <RegistrationForm closeModal={closeModal}/>}
            </div>
        </Modal>
    </ConfigProvider>
  )
}
