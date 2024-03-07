import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import {ConfigProvider, Modal, theme } from "antd"
import { FormattedMessage } from "react-intl";
import closeIcon from '@src/assets/icons/mobile-modal-close.png'
import PrimaryButton from "../PrimaryButton/PrimaryButton";

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
                    <h3 className="firago-medium text-base leading-[19px] text-center mb-[15px] text-black-main dark:text-dark-black-main"><FormattedMessage id="warning"/>!</h3>
                    <hr className="border border-solid border-border-white dark:border-border-dark-white"/>
                    <h3 className="mt-[40px] mb-[20px] firago-semibold text-base leading-[19px] text-center text-black-06 dark:text-dark-black-06"><FormattedMessage id="already.in.cart"/></h3>
                    <div className="flex justify-between mt-[40px]">
                        <PrimaryButton width="100%" height={50} onClick={closeModal}><h3 className="firago-bold text-base leading-[19px] text-white "><FormattedMessage id="understood"/></h3></PrimaryButton>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}
