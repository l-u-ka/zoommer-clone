import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { Button, ConfigProvider, Modal, theme } from "antd"
import { FormattedMessage } from "react-intl";
import closeIcon from '@src/assets/icons/mobile-modal-close.png'

interface AlreadyInCartModalProps {
    modalOpen: boolean;
    closeModal: () => void;
}

export default function AlreadyInCartModal({modalOpen, closeModal}:AlreadyInCartModalProps) {

    const {lightMode} = useThemeProvider();
    const {defaultAlgorithm, darkAlgorithm} = theme;

    const configStyle = {
        algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
        "components": {
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

    return (
        <ConfigProvider theme={configStyle}>
            <Modal centered open={modalOpen} onCancel={closeModal} maskClosable={false} footer={false} className="max-w-[400px]" closeIcon={<img className="relative top-[-8px] w-auto" src={closeIcon} alt="modal close icon"/>}>
                <div>
                    <h3 className="firago-medium text-base leading-[19px] text-center mb-[15px] text-black-main dark:text-white"><FormattedMessage id="warning"/>!</h3>
                    <hr className="border border-solid border-white-400"/>
                    <h3 className="mt-[40px] mb-[20px] firago-semibold text-base leading-[19px] text-center text-black-06 dark:text-white-400"><FormattedMessage id="already.in.cart"/></h3>
                    <div className="flex justify-between mt-[40px]">
                        <Button type="primary" className="w-full custom-button hover:scale-95 transition-all ease-in-out" onClick={closeModal}><FormattedMessage id="understood"/></Button>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}
